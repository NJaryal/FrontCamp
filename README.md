# FrontCamp 

## MongoDB Home Task1

1. Install MongoDB Follow installation guidelines for your OS at https://docs.mongodb.com/manual/installation/#mongodb-communityedition 

2. Saved restaurants.json on your PC from downloaded grow portal.
   > Installed on desktop

3. Use mongoimport (it’s in MongoDB installation folder) to import the collection to the database  Assuming you run local MongoDB on > 
    > C:\Program Files\MongoDB\Server\4.0\bin>mongoimport --db frontcamp --collection restaurants --file       C:\Users\Nitin_Jaryal\Desktop\restaurants.json
2019-05-02T11:58:31.393+0530    connected to: localhost
2019-05-02T11:58:32.949+0530    imported 25359 documents
 
## Mongo - Crossverification of the imported records

*mongo - Switch to frontcamp database* 
```shell
> use frontcamp
switched to db frontcamp
```

### Setting up Tasks

1.  Verify that the number of the documents in the restaurants collection is 25359.
    ```shell
    > db.restaurants.count()
      25359
    ```

2. Query: db.restaurants.find({ borough: "Brooklyn" }).count()
    ```shell
    > db.restaurants.find({borough: "Brooklyn"}).count()
      6086
    ```
3. Query: db.restaurants.find({ borough: "Brooklyn" }).count()
    ```shell
    > db.restaurants.find({borough: "Brooklyn"}).count()
      6086
    ```

### Answer the following questions and include both query and the result (if applicable) into your report: 
1. How many “Chinese” (cuisine) restaurants are in “Queens” (borough)? 
    ```shell
    > db.restaurants.find({borough: "Queens"}).count()
      5656
    ```
    
2. What is the _id of the restaurant which has the grade with the highest ever score? 
    ```shell
    > db.restaurants.find({},{_id: 1}).sort({"grades.score": -1}).limit(1)
    ObjectId("5cca8e0fa1ec5d5dd1872324")
    ```
    
3. Add a grade { grade: "A", score: 7, date: ISODate() } to every restaurant in “Manhattan” (borough). 
    ```shell
    > db.restaurants.find({borough: "Manhattan"}).count()
    10259
    > db.restaurants.updateMany({borough: "Manhattan"},{$push: {grades: {grade: "A", score: 7, date: ISODate()}}})
      { "acknowledged" : true, "matchedCount" : 10259, "modifiedCount" : 10259 }
    ```
    
4. What are the names of the restaurants which have a grade at index 8 with score less then 7? Use projection to include only names without _id. 
    ```shell
   > db.restaurants.find({"grades.7.score": {$lt: 7}},{name: 1, _id: 0})
       { "name" : "El Castillo De Madison" }
       { "name" : "Vee'S Restaurant" }
       { "name" : "Don Alex Restaurant" }
       { "name" : "Gahm Mi Oak Restaurant" }
       { "name" : "Au Za'Atar" }
       { "name" : "Sunshine 27 Seafood Restaurant" }
       { "name" : "New Chung Mee Restaurant" }
       { "name" : "Lucky 11 Bakery" }
       { "name" : "La Cueva Deli & Grocery" }
       { "name" : "Kennedy Fried Chicken" }
       { "name" : "New China Star" }
       { "name" : "Hoy Wong Restaurant" }
       { "name" : "Elena'S Restuarant" }
    ```
    
    
5. What are _id and borough of “Seafood” (cuisine) restaurants  which received at least one “B” grade in period from 2014-02-01 to 2014-03-01? Use projection to include only _id and borough. 
    ```shell
    > db.restaurants.find({ $and: [{ "cuisine": "Seafood" }, { "grades.grade": "B"}, { "grades.date": { $gt: ISODate("2014-02-01"), $lt:     ISODate("2014-03-01") } }] },{_id: 1, borough: 1})
    
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872290"), "borough" : "Queens" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872295"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd18722c7"), "borough" : "Bronx" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872346"), "borough" : "Bronx" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd18723c0"), "borough" : "Brooklyn" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd18726ac"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872a3d"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872b5e"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872cec"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872deb"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872e40"), "borough" : "Brooklyn" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1872e6c"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1873127"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1873178"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd18731ac"), "borough" : "Queens" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1873217"), "borough" : "Brooklyn" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd1873284"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e0fa1ec5d5dd18735de"), "borough" : "Manhattan" }
      { "_id" : ObjectId("5cca8e10a1ec5d5dd1873a19"), "borough" : "Queens" }
      { "_id" : ObjectId("5cca8e10a1ec5d5dd1873b19"), "borough" : "Queens" }
    ```
    
    

4. Indexing Restaurants Collection Note: you may use MongoDB Compass for this task if you want to
#### Create the following indexes: 
1. Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan: 
   ```shell
    > db.restaurants.createIndex({"name": 1 })

   {
     "createdCollectionAutomatically" : false,
     "numIndexesBefore" : 1,
     "numIndexesAfter" : 2,
     "ok" : 1
   }
   ```
  
  > db.restaurants.find({ name: "Glorious Food" }).explain()
     ```shell
     {
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "name" : {
                                "$eq" : "Glorious Food"
                        }
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "name" : 1
                                },
                                "indexName" : "name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "name" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "name" : [
                                                "[\"Glorious Food\", \"Glorious Food\"]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "EPINHYDW0295",
                "port" : 27017,
                "version" : "4.0.9",
                "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
        },
        "ok" : 1
   }
    ```
  
  
   2. Drop index from task 4.1 
   > Option2 :: db.restaurants.dropIndex({"name": 1 })
   > Option2 (indexName is the name of the index) :: db.restaurants.dropIndex("name_1")

    ```shell
    { "nIndexesWas" : 2, "ok" : 1 }   
    ```
  
   3. Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered: 
   ```shell   
   > db.restaurants.createIndex({"restaurant_id": 1})
   {
           "createdCollectionAutomatically" : false,
           "numIndexesBefore" : 1,
           "numIndexesAfter" : 2,
           "ok" : 1
   }
   ```
    
    ```shell
    > db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 }).explain("executionStats")
    {
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "frontcamp.restaurants",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "restaurant_id" : {
                                "$eq" : "41098650"
                        }
                },
                "winningPlan" : {
                        "stage" : "PROJECTION",
                        "transformBy" : {
                                "_id" : 0,
                                "borough" : 1
                        },
                        "inputStage" : {
                                "stage" : "FETCH",
                                "inputStage" : {
                                        "stage" : "IXSCAN",
                                        "keyPattern" : {
                                                "restaurant_id" : 41098650
                                        },
                                        "indexName" : "restaurant_id_41098650",
                                        "isMultiKey" : false,
                                        "multiKeyPaths" : {
                                                "restaurant_id" : [ ]
                                        },
                                        "isUnique" : false,
                                        "isSparse" : false,
                                        "isPartial" : false,
                                        "indexVersion" : 2,
                                        "direction" : "forward",
                                        "indexBounds" : {
                                                "restaurant_id" : [
                                                        "[\"41098650\", \"41098650\"]"
                                                ]
                                        }
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "executionStats" : {
                "executionSuccess" : true,
                "nReturned" : 1,
                "executionTimeMillis" : 1,
                "totalKeysExamined" : 1,
                "totalDocsExamined" : 1,
                "executionStages" : {
                        "stage" : "PROJECTION",
                        "nReturned" : 1,
                        "executionTimeMillisEstimate" : 0,
                        "works" : 2,
                        "advanced" : 1,
                        "needTime" : 0,
                        "needYield" : 0,
                        "saveState" : 0,
                        "restoreState" : 0,
                        "isEOF" : 1,
                        "invalidates" : 0,
                        "transformBy" : {
                                "_id" : 0,
                                "borough" : 1
                        },
                        "inputStage" : {
                                "stage" : "FETCH",
                                "nReturned" : 1,
                                "executionTimeMillisEstimate" : 0,
                                "works" : 2,
                                "advanced" : 1,
                                "needTime" : 0,
                                "needYield" : 0,
                                "saveState" : 0,
                                "restoreState" : 0,
                                "isEOF" : 1,
                                "invalidates" : 0,
                                "docsExamined" : 1,
                                "alreadyHasObj" : 0,
                                "inputStage" : {
                                        "stage" : "IXSCAN",
                                        "nReturned" : 1,
                                        "executionTimeMillisEstimate" : 0,
                                        "works" : 2,
                                        "advanced" : 1,
                                        "needTime" : 0,
                                        "needYield" : 0,
                                        "saveState" : 0,
                                        "restoreState" : 0,
                                        "isEOF" : 1,
                                        "invalidates" : 0,
                                        "keyPattern" : {
                                                "restaurant_id" : 41098650
                                        },
                                        "indexName" : "restaurant_id_41098650",
                                        "isMultiKey" : false,
                                        "multiKeyPaths" : {
                                                "restaurant_id" : [ ]
                                        },
                                        "isUnique" : false,
                                        "isSparse" : false,
                                        "isPartial" : false,
                                        "indexVersion" : 2,
                                        "direction" : "forward",
                                        "indexBounds" : {
                                                "restaurant_id" : [
                                                        "[\"41098650\", \"41098650\"]"
                                                ]
                                        },
                                        "keysExamined" : 1,
                                        "seeks" : 1,
                                        "dupsTested" : 0,
                                        "dupsDropped" : 0,
                                        "seenInvalidated" : 0
                                }
                        }
                }
        },
        "serverInfo" : {
                "host" : "EPINHYDW0295",
                "port" : 27017,
                "version" : "4.0.9",
                "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
        },
        "ok" : 1
    }
    ```

4. Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten Island”: 
> db.restaurants.find({ borough: "Staten Island", cuisine: "American" }) – uses index 
> db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) – does not use index 
> db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) – does not use index 5. Create an index to make query from task 3.4 > covered and provide proof (from explain() or Compass UI) that it is indeed covered

> Main Queries
```shell
> db.restaurants.createIndex( { cuisine: 1 },{ partialFilterExpression: { borough: { $eq:  "Staten Island" } } })
{
     "createdCollectionAutomatically" : false,
     "numIndexesBefore" : 1,
     "numIndexesAfter" : 2,
     "ok" : 1
}
```
    
 ```shell
 > db.restaurants.find({ borough: "Staten Island", cuisine: "American" }).explain("executionStats")
 {
     "queryPlanner" : {
             "plannerVersion" : 1,
             "namespace" : "frontcamp.restaurants",
             "indexFilterSet" : false,
             "parsedQuery" : {
                     "$and" : [
                             {
                                     "borough" : {
                                             "$eq" : "Staten Island"
                                     }
                             },
                             {
                                     "cuisine" : {
                                             "$eq" : "American"
                                     }
                             }
                     ]
             },
             "winningPlan" : {
                     "stage" : "FETCH",
                     "filter" : {
                             "borough" : {
                                     "$eq" : "Staten Island"
                             }
                     },
                     "inputStage" : {
                             "stage" : "IXSCAN",
                             "keyPattern" : {
                                     "cuisine" : 1
                             },
                             "indexName" : "cuisine_1",
                             "isMultiKey" : false,
                             "multiKeyPaths" : {
                                     "cuisine" : [ ]
                             },
                             "isUnique" : false,
                             "isSparse" : false,
                             "isPartial" : true,
                             "indexVersion" : 2,
                             "direction" : "forward",
                             "indexBounds" : {
                                     "cuisine" : [
                                             "[\"American\", \"American\"]"
                                     ]
                             }
                     }
             },
             "rejectedPlans" : [ ]
     },
     "executionStats" : {
             "executionSuccess" : true,
             "nReturned" : 244,
             "executionTimeMillis" : 1,
             "totalKeysExamined" : 244,
             "totalDocsExamined" : 244,
             "executionStages" : {
                     "stage" : "FETCH",
                     "filter" : {
                             "borough" : {
                                     "$eq" : "Staten Island"
                             }
                     },
                     "nReturned" : 244,
                     "executionTimeMillisEstimate" : 0,
                     "works" : 245,
                     "advanced" : 244,
                     "needTime" : 0,
                     "needYield" : 0,
                     "saveState" : 1,
                     "restoreState" : 1,
                     "isEOF" : 1,
                     "invalidates" : 0,
                     "docsExamined" : 244,
                     "alreadyHasObj" : 0,
                     "inputStage" : {
                             "stage" : "IXSCAN",
                             "nReturned" : 244,
                             "executionTimeMillisEstimate" : 0,
                             "works" : 245,
                             "advanced" : 244,
                             "needTime" : 0,
                             "needYield" : 0,
                             "saveState" : 1,
                             "restoreState" : 1,
                             "isEOF" : 1,
                             "invalidates" : 0,
                             "keyPattern" : {
                                     "cuisine" : 1
                             },
                             "indexName" : "cuisine_1",
                             "isMultiKey" : false,
                             "multiKeyPaths" : {
                                     "cuisine" : [ ]
                             },
                             "isUnique" : false,
                             "isSparse" : false,
                             "isPartial" : true,
                             "indexVersion" : 2,
                             "direction" : "forward",
                             "indexBounds" : {
                                     "cuisine" : [
                                             "[\"American\", \"American\"]"
                                     ]
                             },
                             "keysExamined" : 244,
                             "seeks" : 1,
                             "dupsTested" : 0,
                             "dupsDropped" : 0,
                             "seenInvalidated" : 0
                     }
             }
     },
     "serverInfo" : {
             "host" : "EPINHYDW0295",
             "port" : 27017,
             "version" : "4.0.9",
             "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
     },
        "ok" : 1
 }
 ```

 ```shell
 > db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }).explain("executionStats")
 {
     "queryPlanner" : {
             "plannerVersion" : 1,
             "namespace" : "frontcamp.restaurants",
             "indexFilterSet" : false,
             "parsedQuery" : {
                     "$and" : [
                             {
                                     "borough" : {
                                             "$eq" : "Staten Island"
                                     }
                             },
                             {
                                     "name" : {
                                             "$eq" : "Bagel Land"
                                     }
                             }
                     ]
             },
             "winningPlan" : {
                     "stage" : "COLLSCAN",
                     "filter" : {
                             "$and" : [
                                     {
                                             "borough" : {
                                                     "$eq" : "Staten Island"
                                             }
                                     },
                                     {
                                             "name" : {
                                                     "$eq" : "Bagel Land"
                                             }
                                     }
                             ]
                     },
                     "direction" : "forward"
             },
             "rejectedPlans" : [ ]
     },
     "executionStats" : {
             "executionSuccess" : true,
             "nReturned" : 1,
             "executionTimeMillis" : 17,
             "totalKeysExamined" : 0,
             "totalDocsExamined" : 25359,
             "executionStages" : {
                     "stage" : "COLLSCAN",
                     "filter" : {
                             "$and" : [
                                     {
                                             "borough" : {
                                                     "$eq" : "Staten Island"
                                             }
                                     },
                                     {
                                             "name" : {
                                                     "$eq" : "Bagel Land"
                                             }
                                     }
                             ]
                     },
                     "nReturned" : 1,
                     "executionTimeMillisEstimate" : 11,
                     "works" : 25361,
                     "advanced" : 1,
                     "needTime" : 25359,
                     "needYield" : 0,
                     "saveState" : 198,
                     "restoreState" : 198,
                     "isEOF" : 1,
                     "invalidates" : 0,
                     "direction" : "forward",
                     "docsExamined" : 25359
             }
     },
     "serverInfo" : {
             "host" : "EPINHYDW0295",
             "port" : 27017,
             "version" : "4.0.9",
             "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
     },
     "ok" : 1
 }
 ```

 ```shell
 > db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }).explain("executionStats")
 {
     "queryPlanner" : {
             "plannerVersion" : 1,
             "namespace" : "frontcamp.restaurants",
             "indexFilterSet" : false,
             "parsedQuery" : {
                     "$and" : [
                             {
                                     "borough" : {
                                             "$eq" : "Queens"
                                     }
                             },
                             {
                                     "cuisine" : {
                                             "$eq" : "Pizza"
                                     }
                             }
                     ]
             },
             "winningPlan" : {
                     "stage" : "COLLSCAN",
                     "filter" : {
                             "$and" : [
                                     {
                                             "borough" : {
                                                     "$eq" : "Queens"
                                             }
                                     },
                                     {
                                             "cuisine" : {
                                                     "$eq" : "Pizza"
                                             }
                                     }
                             ]
                     },
                     "direction" : "forward"
             },
             "rejectedPlans" : [ ]
     },
     "executionStats" : {
             "executionSuccess" : true,
             "nReturned" : 277,
             "executionTimeMillis" : 26,
             "totalKeysExamined" : 0,
             "totalDocsExamined" : 25359,
             "executionStages" : {
                     "stage" : "COLLSCAN",
                     "filter" : {
                             "$and" : [
                                     {
                                             "borough" : {
                                                     "$eq" : "Queens"
                                             }
                                     },
                                     {
                                             "cuisine" : {
                                                     "$eq" : "Pizza"
                                             }
                                     }
                             ]
                     },
                     "nReturned" : 277,
                     "executionTimeMillisEstimate" : 11,
                     "works" : 25361,
                     "advanced" : 277,
                     "needTime" : 25083,
                     "needYield" : 0,
                     "saveState" : 198,
                     "restoreState" : 198,
                     "isEOF" : 1,
                     "invalidates" : 0,
                     "direction" : "forward",
                     "docsExamined" : 25359
             }
     },
     "serverInfo" : {
             "host" : "EPINHYDW0295",
             "port" : 27017,
             "version" : "4.0.9",
             "gitVersion" : "fc525e2d9b0e4bceff5c2201457e564362909765"
     },
     "ok" : 1
 }
 ```

## MongoDB Home Task2

1. How many records does each airline class have? Use $project to show result as { class: "Z", total: 999 } 
   ```shell
   db.airlines.aggregate([
    {
        $group: {
            _id : "$class",
           count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            class: "$_id",
            total: "$count"
        }
    }
   ])
   ```
2. What are the top 3 destination cities outside of the United States (destCountry field, not included) with the highest average passengers count? Show result as { "avgPassengers" : 2312.380, "city" : "Minsk, Belarus" }.
   ```shell
   db.airlines.aggregate([
    {
        $match: {
            destCountry : {$ne: "United States"},
        }
    },
    {
     $group: {    
       _id: "$destCity",       
       Passengers: { $avg: "$passengers" }
     }
   },
   {
       $project: {
            _id: 0,
            city: "$_id",
            avgPassengers: "$Passengers"
        }
   },
    { $sort : { avgPassengers : -1}     },
    {
        $limit: 3
    }
   ])
   
   { "city" : "Abu Dhabi, United Arab Emirates", "avgPassengers" : 8052.380952380952 }
   { "city" : "Dubai, United Arab Emirates", "avgPassengers" : 7176.596638655462 }
   { "city" : "Guangzhou, China", "avgPassengers" : 7103.333333333333 }
   ```

3. Which carriers provide flights to Latvia (destCountry)? Show result as one document { "_id" : "Latvia", "carriers" : [ "carrier1", " carrier2", …] }          
   ```shell
   db.airlines.aggregate([
    {
        $match: {
            destCountry: {$eq: "Latvia"}
        }
    },
     {
         $group: {
             _id: "$destCountry",
             carriers: {$addToSet: "$carrier"}
         }
     }
   ])
   
   { "_id" : "Latvia", "carriers" : [ "Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG" ] }
   ```
4. What are the carriers which flue the most number of passengers from the United State to either Greece, Italy or Spain? Find top 10 carriers, but provide the last 7 carriers (do not include the first 3). Show result as { "_id" : "<carrier>", "total" : 999}    
```shell
   db.airlines.aggregate([
        {   
        $match:{"$and":[       
        {"$or":[         
        {"destCountry":"Greece"},         
        {"destCountry":"Italy"},         
        {"destCountry":"Spain"}]},       
        {"originCountry":"United States"}]}},
        {
         $group: {
             _id: "$carrier",
             totalPassengers : {$max : "$passengers"}
         }         
     },
     {$sort: {totalPassengers: -1}},
     {$limit: 10},
     {$skip: 3}
    ])
   
   { "_id" : "Emirates", "totalPassengers" : 12144 }
   { "_id" : "Air Europa", "totalPassengers" : 8086 }
   { "_id" : "American Airlines Inc.", "totalPassengers" : 8065 }
   { "_id" : "United Air Lines Inc.", "totalPassengers" : 7313 }
   { "_id" : "Meridiana S.p.A", "totalPassengers" : 6173 }
   { "_id" : "Norwegian Air Shuttle ASA", "totalPassengers" : 2381 }
   { "_id" : "Atlas Air Inc.", "totalPassengers" : 85 }
```

5. Find the city (originCity) with the highest sum of passengers for each state (originState) of the United States (originCountry). Provide the city for the first 5 states ordered by state alphabetically (you should see the city for Alaska, Arizona and etc). Show result as { "totalPassengers" : 999, "location" : { "state" : "abc", "city" : "xyz" } }    
```shell
 db.airlines.aggregate([
    {   
        $match:{
            originCountry: {$eq: "United States"}
        }
    },
    {
        $group: {
            _id: {city: "$originCity", state: "$originState"},
            passengersSum : {$sum : "$passengers"}
        }         
    },     
    {
        $group: {
            _id: {state: "$_id.state"},
            totalPassengers : {$sum: "$passengersSum"}
        }         
    },
    {
        $sort: { _id: 1} 
    },
    {
        $project: {
            "location":"$_id",
            totalPassengers: "$totalPassengers",
            _id: 0
        }
    }, 
    {
        $limit: 5
    } 
 ])
 
{ "location" : { "state" : "Alabama" }, "totalPassengers" : 1349135 }
{ "location" : { "state" : "Alaska" }, "totalPassengers" : 2814073 }
{ "location" : { "state" : "Arizona" }, "totalPassengers" : 14393383 }
{ "location" : { "state" : "Arkansas" }, "totalPassengers" : 1049440 }
{ "location" : { "state" : "California" }, "totalPassengers" : 63477673 }
```
