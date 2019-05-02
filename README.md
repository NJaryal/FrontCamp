# FrontCamp - Mongo

MongoDB. Home Task 1 Note: if you already have MongoDB installed, please, check that you are running the latest version – 3.6, because it’s necessary to complete some of the tasks 1. Install MongoDB Follow installation guidelines for your OS at https://docs.mongodb.com/manual/installation/#mongodb-communityedition 

1. Saved restaurants.json on your PC from downloaded grow portal.
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
    > db.restaurants.find().sort({"grades.score": -1}).limit(1).next()._id
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
    db.restaurants.find({cuisine: "Seafood"},{"grades.grade.B":{$elemMatch: {$gte: ISODate("2014-02-01"), $lt: ISODate("2014-03-01")}}})
    ```
    
    

4. Indexing Restaurants Collection Note: you may use MongoDB Compass for this task if you want to 


Create the following indexes: 
1. Create an index which will be used by this query and provide proof (from explain() or Compass UI) that the index is indeed used by the winning plan: 
  db.restaurants.find({ name: "Glorious Food" }) 
  
2. Drop index from task 4.1 3. Create an index to make this query covered and provide proof (from explain() or Compass UI) that it is indeed covered: 
db.restaurants.find({ restaurant_id: "41098650" }, { _id: 0, borough: 1 })


4. Create a partial index on cuisine field which will be used only when filtering on borough equal to “Staten Island”: 
db.restaurants.find({ borough: "Staten Island", cuisine: "American" }) – uses index 
db.restaurants.find({ borough: "Staten Island", name: "Bagel Land" }) – does not use index 
db.restaurants.find({ borough: "Queens", cuisine: "Pizza" }) – does not use index 5. Create an index to make query from task 3.4 covered and provide proof (from explain() or Compass UI) that it is indeed covered

