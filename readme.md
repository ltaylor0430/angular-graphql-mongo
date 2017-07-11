
#Angular 2, GraphQL 

MongoDB Tree Structure with Ancestors array
This is for educational purposes only.
ancestors for techdata 

categories
 "TechnicalData"
        |
   "Techorder"
        |----------------|
    "Figures"         Drawings
        |                
        |
      "Parts"


["TechnicalData","Techorder","Figures","Parts"]

//category tree
db.techdata.insert({_id:"TechnicalData",name:"Technical Data",ancestors:[], parent:null});
db.techdata.insert({_id:"Techorder",name:"Techorder Data",ancestors:["TechnicalData"], parent:"TechnicalData"});
db.techdata.insert({_id:"Figures", name:"Figures", ancestors:["TechnicalData","Techorder"], parent:"Techorder"});
db.techdata.insert({_id:"Parts", name:"Parts",ancestors:["TechnicalData","Techorder","Figures","Parts"], parent:"Figures"});
 
 
Fig-part 1:1
to-fig 1-many

#Techorder record insert
  db.techdata.save({_id:"techorder1",uid:"techorder1", name:"1C-2E-4E", content:"This is the content of an awesome file.", parent:"Techorder", ancestors:["Techorder"],referenceId: null, ancestorIds:[]});

  db.techdata.save({_id:"techorder2",uid:"t2r1", name:"APPLE-2E", content:"A large text field will be here.", parent:"Techorder", ancestors:["Techorder"],referenceId: null, ancestorIds:[]});
#Figure record insert
  db.techdata.save({_id:"to1figure1",uid:"to1fig1", name:"Figure 1-A.", parent:"Figures", ancestors:["Techorder","Figures"],referenceId: "techorder1", ancestorIds:["techorder1"]});

  db.techdata.save({_id:"to1figure2",uid:"to1fig2", name:"Figure 2-A.", parent:"Figures", ancestors:["Techorder","Figures"],referenceId: "techorder1", ancestorIds:["techorder1"]});

  db.techdata.save({_id:"to2figure1",uid:"fig1234", name:"Figure 1-A.", parent:"Figures", ancestors:["Techorder","Figures"],referenceId: "techorder2",ancestorIds:["techorder2"]});

#Parts Data

  db.techdata.save({_id:"part1", uid:"part1",name:"Part 1-A.",partindicies:["1A","2B"], parent:"Parts", ancestors:["TechnicalData","Techorder","Figures","Parts"],referenceId: "to1figure1", ancestorIds:["techorder1","to1figure1"]});

  db.techdata.save({_id:"p234af", uid:"part1",name:"Part 1-A.",partindicies:["1A","2B"], parent:"Parts", ancestors:["TechnicalData","Techorder","Figures","Parts"],referenceId: "to2figure1", ancestorIds:["techorder2","to2figure1"]});

  db.techdata.save({_id:"part2", uid:"part2",name:"Part 2-A.",partindicies:["1A","2B"], parent:"Parts", ancestors:["TechnicalData","Techorder","Figures","Parts"],referenceId: "to1figure1", ancestorIds:["techorder1","to1figure1"]});

  //part 1 use in another figure
  db.techdata.save({_id:"part3",  uid:"part1",partindicies:["1A","2B"], name:"Part 1-A.", parent:"Parts", ancestors:["TechnicalData","Techorder","Figures","Parts"],referenceId: "to1figure2", ancestorIds:["techorder1","to1figure2"]});

#Parts query
  db.techdata.find( { 
    _id: { $in: db.techdata.findOne( { uid:"part1"}).ancestorIds }});
  db.techdata.findOne( {uid:"part1"});

#Facet queries
  //Gets all item count, does not deduplicate
  db.techdata.aggregate( [ { "$unwind": "$uid"}, { "$sortByCount": "$parent"} ])

  //Gets all item counts with distinct counts
  db.techdata.aggregate( [
    { "$match": { "uid": { "$ne": null }}},
    // Count all occurrences
    { "$group": {
        "_id": {
            "uid": "$uid",
            "name": "$name",
            "parent": "$parent"
        },
        "count": { "$sum": 1 }
    }},
    // Sum all occurrences and count distinct
    { "$group": {
        "_id": "$_id.parent",
      
        "totalCount": { "$sum": "$count" },
        "distinctCount": { "$sum": 1 }
    }}
    
    
  ]).pretty();
  //match, group, find in

#Find Where the part is being used

  db.techdata.aggregate( [
  { 
    "$match": { "uid": "part1"}
  },
  { 
    $graphLookup: {
    from:"techdata",
    startWith: "$referenceId",
    connectFromField: "referenceId",
    connectToField: "_id",
    as: "whereused"
  }
  },
  {
    $group: {
      _id: "$uid",
      foundIn : { $addToSet: "$whereused" }
    }
  },

    {
        $project: {
            foundIn: {
                $reduce: {
                  input:"$foundIn",
                  initialValue:[],
                  in:          
                  { $setUnion :["$$value", "$$this"]}
                  }
            }
        }
    }
    
    
    ]).pretty();

    