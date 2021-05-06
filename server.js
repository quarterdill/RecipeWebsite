const express = require('express')
const recipeRouter = require('./routes/recipes')
const app = express()
const mongoose = require('mongoose')
const Recipe = require('./models/recipe')
const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost/Recipes'
const {ObjectId} = require('mongodb');
const id = ObjectId("5ff0e136d7557de1509e2d36");

// const password = encodeURIComponent("9LzwsS4rsuWZvMx1")

/*mongoose.connect(url, { 
    useNewUrlParser: true, useUnifiedTopology: true//, useCreateIndex: true
})*/

// const uri = "mongodb+srv://TheDillCooksFood2021:${password}@recipedb.wcoeh.mongodb.net/<RecipeDB>?retryWrites=true&w=majority";
const query = {"recipe": "pizza"};
//const client = new MongoClient(uri, {useNewUrlParser: true}, {useUnifiedTopology: true}, {connectTimeoutMS: 30000}, {keepAlive: 1});

const dbName = 'DillRecipes'
// let db

// MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//   if (err) return console.log(err)

//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName)
//   console.log(`Connected MongoDB: ${uri}`)
//   console.log(`Database: ${dbName}`)

//   var cursor = db.orders.find({}, {"recipe": "Pizza"});
//   cursor.each(function(err, doc) {
//       console.log(doc);
//   })
// }) 


//listDatabases of cluster function
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

 async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://TheDillCooksFood2021:D0W4n8hYP6Gl17yR@recipedb.wcoeh.mongodb.net/RecipeDB?retryWrites=true&w=majority";
    // const uri = "mongodb+srv://TheDillCooksFood2021:${password}@recipedb.wcoeh.mongodb.net/RecipeDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true });
     
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// main().catch(console.error);


async function findOneListingByName(nameOfListing) {
    const uri = "mongodb+srv://TheDillCooksFood2021:D0W4n8hYP6Gl17yR@recipedb.wcoeh.mongodb.net/RecipeDB?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        result = await client.db("DillRecipes").collection("recipes")
                        .findOne({ recipe: nameOfListing });
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}



const recipeNames = ["Pizza", "Brownies"];

let recipeArray = new Array(recipeNames.length);

async function findRecipe(nameOfRecipe) {
    const uri = "mongodb+srv://TheDillCooksFood2021:D0W4n8hYP6Gl17yR@recipedb.wcoeh.mongodb.net/RecipeDB?retryWrites=true&w=majority";
    
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        result = await client.db("DillRecipes").collection("recipes")
                        .findOne({recipe: nameOfRecipe });
        
    } catch (e) {
        return e;
    } finally {
        await client.close();
    }

    if (result) {
        return result;
    } else {
        return `No recipes found with the name 'nameofRecipe'`;
    }
}

// async function makeRecipes() {
//     for(i = 0; i < recipeNames.length; i++) {
//         recipeArray[i] = await findRecipe(recipeNames[i]);
//     }
// }
// console.log(recipeArray);

//findOneListingByName("Brownies").catch(console.error);
//findRecipe("Pizza").catch(console.error);


for(i = 0; i< recipeNames.length; i++) {
    let rec = recipeNames[i];
    recipeArray[i] = findRecipe(rec);
}

function test() {
Promise.all(recipeArray).then((values) => {
    return values;
  });
}


// findRecipe(rec).then(function(result) {
//     recipeArray[i] = result;
//     console.log(result)
// })


// client.connect(err => {
//   const collection = client.db("DillRecipes").collection("recipes");
//   console.log(collection);
//   // perform actions on the collection object
//   client.close();
// });


// client.connect(err => {
//     //const collection = client.db("test").collection("devices");
//     //console.log(collection)
//     console.log("Success!")
//     const recip = client.db("DillRecipes").collection("recipes").findOne({"_id": id}, {});
//     console.log(recip);
//   // perform actions on the collection object
//     client.close();
// });


//var names = ["Pizza", "Brownies"];

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/img'));

app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    for(i = 0; i< recipeNames.length; i++) {
        let rec = recipeNames[i];
        recipeArray[i] = await findRecipe(rec);
    }
    res.render('recipes/index', {recipes: recipeArray})
})

app.use('/recipes', recipeRouter)

app.listen(5000)