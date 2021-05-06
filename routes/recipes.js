const express = require('express')
const Recipe = require('./../models/recipe')
const router = express.Router()
const {MongoClient} = require('mongodb');


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

router.use(express.static(__dirname + '/public'));

router.get('/wontons', async (req, res) =>{
    const rec = "Chinese Wontons";
    const recipeinfo = await findRecipe(rec);
    const Img = "img/wontons.png";

    res.render('recipes/new', {recipeinfo: recipeinfo, imgname: Img}) //pass in values here
})

router.get('/lasagna', async (req, res) =>{
    const rec = "Lasagna";
    const recipeinfo = await findRecipe(rec);
    const Img = "img/lasagna.png";

    res.render('recipes/new', {recipeinfo: recipeinfo, imgname: Img}) //pass in values here
})

router.get('/shrimpwraps', async (req, res) =>{
    const rec = "Shrimp Wraps";
    const recipeinfo = await findRecipe(rec);
    const Img = "img/shrimpwrap.png";

    res.render('recipes/new', {recipeinfo: recipeinfo, imgname: Img}) //pass in values here
})

router.get('/pizza', async (req, res) =>{ // if its /pizza just query for pizza and return one recipe
    const rec = "Pizza";
    const recipeinfo = await findRecipe(rec);
    const Img = "img/pizza.png";

    res.render('recipes/new', {recipeinfo: recipeinfo, imgname: Img}) //pass in values here
})

router.get('/eggtarts', async (req, res) =>{
    const rec = "Hong Kong Egg Tarts";
    const recipeinfo = await findRecipe(rec);
    const Img = "img/eggtarts.png";

    res.render('recipes/new', {recipeinfo: recipeinfo, imgname: Img}) //pass in values here
})

router.get('/baozi', async (req, res) =>{
    const rec = "Chinese Steamed Vermicelli Baozi";
    const recipeinfo = await findRecipe(rec);
    const Img = "img/baozi.png";

    res.render('recipes/new', {recipeinfo: recipeinfo, imgname: Img}) //pass in values here
})

module.exports = router




// for(i = 0; i< recipeNames.length; i++) {
//     let rec = recipeNames[i];
//     recipeArray[i] = await findRecipe(rec);
// }

// OLD CODE USING _id TO ROUTE RECIPES
// router.get('/:id', async (req, res) => {
//     const recipe = await Recipe.findById(req.params.id)
//     if (recipe == null) res.redirect('/')
//     res.render('recipes/:id', { recipe: recipe })
// })


/* router.get('/new', (req, res) => {
    res.render('recipe/new', { recipe: new Recipe() })
  })


 router.post('/', async (req, res) => {
    let recipe = new Recipe ({
        recipe: req.body.recipe,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        photo: req.body.photo,
    })
    try {
        recipe = await recipe.save()
        res.redirect(`/recipes/$(article.id)$`)
    }
    catch(err) {
        console.log(err)
        res.render('/', { recipe: recipe})
    }
})  */