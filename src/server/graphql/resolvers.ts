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

  public async getFacetCounts(queryObject: any) {
    return await this.db.collection('techdata').aggregate([
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
  public async findPartWhereUsed(arg: { uid: string }) {
    return await this.db.collection('techdata').aggregate([
      { $match: { $and: [ { uid: { $ne: null } }, arg]}},
      {
        $graphLookup: {
          from: 'techdata',
          startWith: arg.uid,
          connectFromField: 'ancestorIds',
          connectToField: 'uid',
          as: 'whereused'
        }
      }]).toArray();
  }
  public async findTechorders(): Promise<any> {
    return await this.db.collection('techdata').find().toArray();
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
          if (obj.nsn) {
            return 'Part';
          }
          return null;
        }
      },
      PartsUnion: {
        __resolveType: (obj, context, info) => {
          console.log('parts union');
          if (obj.figureNumber) {
            return 'Figure';
          }
          if (obj.publicationDate) {
            return 'Techorder';
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
        }
      }
    };
  }

}
