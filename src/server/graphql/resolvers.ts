import mongodb from 'mongodb';
import assert from 'assert';

export class Resolvers {
  private dbClient: mongodb.MongoClient = mongodb.MongoClient;
  private db: mongodb.Db;
  constructor() {
    this.dbClient.connect('mongodb://localhost:27017/test', (err, db) => {
      assert.equal(null, err);
      this.db = db;
      console.log('connected to mongodb');
      this.getFacetCounts({}).then((result) => console.log(result));
      this.findPartWhereUsed({ uid: 'part1' }).then((result) => console.log(result));
    });

  }
  public findTechorder(arg: { _id: string } = null): Promise<any> {
    return this.db.collection('techdata').findOne(arg);
  }
  public findTechorders(): Promise<any> {

    return this.db.collection('techdata').find({ parent: 'Techorder' }).toArray();
  }

  public getFacetCounts(queryObject: any) {
    return this.db.collection('techdata').aggregate([
      { $match: { uid: { $ne: null } } },
      // Count all occurrences
      {
        $group: {
          _id: {
            uid: '$uid',
            name: '$name',
            parent: '$parent'
          },
          count: { $sum: 1 }
        }
      },
      // Sum all occurrences and count distinct
      {
        $group: {
          _id: '$_id.parent',

          totalCount: { $sum: '$count' },
          distinctCount: { $sum: 1 }
        }
      }

    ]).toArray();
  }
  public findPartWhereUsed(arg: { uid: string }) {
    return this.db.collection('techdata').aggregate([
      // Perform match aka having clause
      { $match: { $and: [{ uid: { $ne: null } }, arg] } },
      // Perform lookup to get reference to all parent items
      {
        $graphLookup: {
          from: 'techdata',
          startWith: '$referenceId',
          connectFromField: 'referenceId',
          connectToField: '_id',
          as: 'whereused'
        }
      },
      // Group by uid since _id will always be unique
      {
        $group: {
          _id: '$uid',
          foundIn: { $addToSet: '$whereused' }
        }
      },
      // Reduce to a single array
      {
        $project: {
          whereused: {
            $reduce: {
              input: '$foundIn',
              initialValue: [],
              in:
              { $setUnion: ['$$value', '$$this'] }
            }
          }
        }
      }]).toArray();
  }
  public findParts(): Promise<any> {
    return this.db.collection('techdata').find({ parent: 'Parts' }).toArray();
  }

  public getResolverMap() {
    return {
      TechData: {
        __resolveType: (obj, context, info) => {
          if (obj.figureNumber) {
            return 'Figure';
          }
          if (obj.publicationDate) {
            return 'Techorder';
          }
          if (obj.partindicies) {
            return 'Part';
          }
          return null;
        }
      },

      PartsUnion: {
        __resolveType: (obj, context, info) => {
          console.log('parts union');
          console.log(obj.parent);
          if (obj.parent === 'Figures') {
            return 'Figure';
          }
          if (obj.parent === 'Techorder') {
            return 'Techorder';
          }
          if (obj.parent === 'Parts') {
            return 'Part';
          }
          return null;
        }
      },
      Query: {

        facets: (obj, args, context, info) => {
          return this.getFacetCounts({ q: args.q });
        },
        part: (obj, args, context, info) => {
          return this.findPartWhereUsed({ uid: args.uid });
        },
        partList: (obj, args, context, info) => {
          return this.findParts();
        },
        techorder: (obj, args, context, info) => {
          return this.findTechorder({ _id: args.id });
        },
        techorders: (obj, args, context, info) => {
          return this.findTechorders();
        },
      }
    };
  }

}
