const express = require("express");
const recipeRouter = require("./routes/recipes");
const app = express();
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const { MongoClient } = require("mongodb");

//listDatabases of cluster function
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  //const uri = process.env.MONGO_URI;
  const uri =
    "mongodb+srv://TheDillCooksFood2021:D0W4n8hYP6Gl17yR@recipedb.wcoeh.mongodb.net/RecipeDB?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// main().catch(console.error);

const recipeNames = ["Pizza", "Brownies"];

let recipeArray = new Array(recipeNames.length);

async function findRecipe(nameOfRecipe) {
  //const uri = process.env.MONGO_URI;
  const uri =
    "mongodb+srv://TheDillCooksFood2021:D0W4n8hYP6Gl17yR@recipedb.wcoeh.mongodb.net/RecipeDB?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    result = await client
      .db("DillRecipes")
      .collection("recipes")
      .findOne({ recipe: nameOfRecipe });
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

app.set("view engine", "ejs");

// set the files we can access, css and img
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/img"));

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  for (i = 0; i < recipeNames.length; i++) {
    let rec = recipeNames[i];
    recipeArray[i] = await findRecipe(rec);
  }
  res.render("recipes/index", { recipes: recipeArray });
});

app.use("/recipes", recipeRouter);

//let port = process.env.PORT;
let port = 3000;
if (port == null || port == "") {
  port = 3000;
}
// console.log(port);
app.listen(port);

// async function makeRecipes() {
//     for(i = 0; i < recipeNames.length; i++) {
//         recipeArray[i] = await findRecipe(recipeNames[i]);
//     }
// }
// console.log(recipeArray);

//findRecipe("Pizza").catch(console.error);

// function to get all recipes
// function test() {
// Promise.all(recipeArray).then((values) => {
//     return values;
//   });
// }

// failed attempts to connect to mongodb database
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
