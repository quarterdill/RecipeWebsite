const express = require("express");
const Recipe = require("./../models/recipe");
const router = express.Router();
const { MongoClient } = require("mongodb");

let recipeMap = {
  wontons: {
    recipe: "Chinese Wontons",
    ingredients: `<strong>Wrapper</strong> <br>
    4 cups all-purpose flour <br> 2 large eggs <br> 1/2 to 1 cup warm water <br> 1 and 1/2 tsp salt <br> 
    <strong>Filling</strong> <br>
    750g ground pork <br> 1 tbsp salt <br> 4 tbsp soy sauce <br> 1 tbsp sesame oil <br> 500g minced shepherd's purse `,
    instructions: `<strong>Servings:</strong> 100 wontons <br>
    <strong>Cooking Time:</strong> 2.5 hours prep, 20 minutes cook <br>
    You should adjust the ingredients and quantities your needs or desires. Experiment with whatever filling you think tastes good! <br>
    1. Heat the water in a bowl in the microwave or other kitchen appliance. <br>
    2. Mix the flour and salt in another bowl and combine with the water. Add in the eggs. I use a chopstick to mix them together, but you can use any utensil you prefer. Stir in circles until it is difficult to continue. Clean off your utensil and scrape down the sides and bottom of the bowl before kneading. The dough will be dry, a bit crumbly, and hard to work with. It is worth spending 10 to 20 minutes to knead it. Making wontons with more hydrated dough is far more difficult than this step. <br>
    3. When the dough is combined cover the bowl, and rest in your oven. It is okay if the dough is not smooth and there are some spots of flour. <br>
    4. Mix the filling together, adding sesame oil right before you begin making wontons. You can microwave a small piece of filling for 10-15 seconds to taste for seasoning. <br>
    5. Cut the dough into hand-sized pieces and shape them into an oblong shape. Roll each one into a rectangular sheet as thin as you can; I can put it through the 7th level of my pasta maker. It should be smooth and translucent when you hold it up to a light. Cut the sheets into 3 inch squares. It is fine is some wrappers are irregular, just make sure you can fold them over themselves. Be careful when stacking wrappers as they can stick together. <br>
    6. Put 1 to 2 tablespoons of filling in the centre of each wrapper, depending on size. You want there to be space around the filling; it should be less than half the length of the wrapper. Fold the wrapper in half and seal the edges (use water if too dry) so that the filling is contained inside. Find the one edge that did not need to be sealed and hold one of its corners in each hand. Pull the edges together and seal them. <br>
    7. Boil 2 litres of water in a large pot. Add in half of the wontons at a time. Add in half a cup of cold water every time it boils, and after the water boils 3 times the wontons are done. You can eat them alone or with sauce. If you make a large batch, you can mix some sesame oil with the wontons or put them in soup after they are cooked to prevent them from sticking while you eat. Enjoy! <br>
    <strong>Wontons can be stored for 3-5 days in the refrigerator and up to 2 months in the freezer.</strong>`,
  },
  pizza: {
    recipe: "Pizza",
    ingredients: `5 cups all-purpose flour <br> 2 cups warm water <br> 1 tbsp active dry yeast <br> 4 tbsp of olive oil <br> 1 tsp sugar <br> 1 tbsp salt <br> 700mL tomato sauce <br> 400g shredded mozzarella <br> 1 bunch (500g) spinach <br> 4 peppers <br> 2 cartons (500g) mushrooms <br> 500g ground pork`,
    instructions: `<strong>Servings:</strong> 16 (Two 18 by 13 inch rectangular pizzas) <br>
  <strong>Cooking Time:</strong> 2 hours prep, 30 minutes cook <br>
  You should adjust the ingredients and quantities your needs or desires. For example, I sometimes make dough with half whole wheat and half all-purpose flour, which takes more time to rise but is healthier. All toppings are optional; experiment with whatever you think tastes good! <br>
  1. Heat the water in a bowl in the microwave or other kitchen appliance and make sure it is a temperature where you can keep your finger in the water without any discomfort. <br>
  2. Add the sugar and yeast, mixing until they are both completely dissolved. You can add at most one more tablespoon of yeast if you are in a rush. You can also wait for the yeast to bloom if you are not sure if it is alive, but blooming has no effect on the dough. <br>
  3. Mix the flour and salt in another bowl and combine with the yeast mixture. I use a chopstick to mix them together, but you can use any utensil you prefer. Stir in circles until it is difficult to continue. Clean off your utensil and scrape down the sides and bottom of the bowl before kneading. If the dough is a bit dry, knead it for a few more minutes before adding water as the moisture will spread out. The extra half cup of flour you find at the bottom will disappear before you know it. <br>
  4. When the dough is smooth and has no spots of flour, add olive oil to the bottom of the bowl. Rub it around with the dough to make sure the dough doesn't stick when it rises, cover the bowl, and rest in your oven until it has doubled in size, which can take 2-5 hours. You can divide the dough and refrigerate it for up to a week, which will allow it to relax and develop more flavour. <br>
  5. Since the toppings I use contain a lot of water and I do not bake with a super high temperature, I like to cook my toppings to reduce the amount of water they release when baked. <br>
  6. Preheat your oven to 400 degrees Fahrenheit. Stretch or roll the dough to fit each pan, oil the pan before putting the dough in, and then add sauce, toppings, and cheese. Bake for 15-20 minutes and let it rest for 5 minutes before serving. Enjoy! <br>
  <strong>Pizza can be stored for 3-4 days in the refrigerator.</strong>`,
  },
  baozi: {
    recipe: "Chinese Steamed Vermicelli Baozi",
    ingredients: `<strong>Bun</strong> <br>
  6 cups of all-purpose flour <br> 2 and 1/4 cups of warm water <br> 1 tbsp of active dry yeast <br> 1 tsp of sugar <br>
  <strong>Filling</strong> <br>
  400g mung bean (or any thin) vermicelli <br> 450g of peeled and cubed shrimp <br> 300g of minced shiitake mushrooms <br> 500g of minced carrots <br> 1 tbsp of salt <br> 4 tbsp of soy sauce <br> 2 tbsp of sesame oil`,
    instructions: `<strong>Servings:</strong> 25 buns <br>
  <strong>Cooking Time:</strong> 1.5 hours prep, 40 minutes cook <br>
  You should adjust the ingredients and quantities your needs or desires. For example, I sometimes make dough with half whole wheat and half all-purpose flour, which takes more time to rise but is healthier. Experiment with whatever filling you think tastes good! <br>
  1. Heat the water in a bowl with the microwave and make sure it is a temperature where you can keep your finger in the water comfortably. <br>
  2. Add the sugar and yeast, mixing until they are both completely dissolved. You can add at most one more tablespoon of yeast if you are in a rush. You can also wait for the yeast to bloom if you are not sure if it is alive, but blooming has no effect on the dough. <br>
  3. Mix the flour and salt in another bowl and combine with the yeast mixture. I use a chopstick to mix them together, but you can use any utensil you prefer. Stir in circles until it is difficult to continue. Clean off your utensil and scrape down the sides and bottom of the bowl before kneading. If the dough is a bit dry, knead it for a few more minutes before adding water as the moisture will spread out. The extra half cup of flour you find at the bottom will disappear before you know it. <br>
  4. When the dough is smooth and has no spots of flour, cover the bowl, and rest in your oven until it has doubled in size, which can take 2-5 hours. <br>
  5. Mix the filling together, adding sesame oil right before you begin pleating. You can microwave some filling for 10-15 seconds to taste for seasoning. <br>
  6. Divide the dough into sesame-ball shaped pieces (1-1.5 inch diameter). Roll each one into a circle with a thicker centre, which will prevent the baozi from breaking when you take it out of the steamer and allow it to absorb juices. To do this, your dominant hand should push the rolling pin up, going from the bottom of the wrapper to its centre. Your non-dominant hand should be holding the other side of the wrapper not touched by the rolling pin. Rotate the wrapper with your left hand, and repeat. You do not want the outer edge of the wrapper to be too thin, so when it has a 4 to 5 inch diameter you are done. <br>
  7. Put as much filling as possible into each wrapper, which can vary from 6-10 tablespoons depending on size. You need space around the filling; it should be two thirds of the diameter as you will stretch the wrapper. Put the wrapper in the palm of one hand and hold the nearest edge up with the other hand. Gently pull the wrapper towards another part of the wrapper that is sitting in your hand. Pleat each section as you grab it to make a seal and contain the filling. You want to aim for roughly 8 pleats, and it is fine if there are small holes near the top of the baozi. <br>
  8. Boil 2L of water in a large pot. Place baozi around the steamer basket with an inch between them as they will expand as they cook. For reference, my basket has a 10 inch diameter and can fit 8 baozi. Steam for 15 minutes, then turn off the heat and let them sit covered for 5 minutes. If you are struggling to get the baozi out, wait a few minutes and use a spoon to scrape them off the basket. You can also steam them with a cotton cloth, but it has to be thoroughly cleaned after. Enjoy! <br>
  <strong>Baozi can be stored for 3-5 days in the refrigerator.</strong>`,
  },
  lasagna: {
    recipe: "Lasagna",
    ingredients: `18 lasagna sheets <br> 1 tbsp salt <br> 1.2 L tomato sauce <br> 2 pounds of any ground meat <br> 1 tbsp cooking oil of your choice <br> 500g spinach <br> 2 large carrots <br> 1 large onion <br> 2 tsp dried basil <br> 1 bulb of garlic <br> 400g shredded mozzarella`,
    instructions: `<strong>Servings:</strong> 8 servings <br>
  <strong>Cooking Time:</strong> 2 hours prep, 45 minutes cook <br>
  You should adjust the ingredients and quantities your needs or desires. <br>
  
  1. Mince the onion, carrot, and garlic with a food processor and wash the spinach. <br>
  2. Add the oil to a high-sided pan and sear the meat, making sure to break it into small pieces. Add the salt, pepper, onion, carrot, and garlic when the meat is cooked and mix well. <br> 
  3. When everything is mixed well, add the tomato sauce, and basil. If the sauce is too thick you can add water or any broth. Let it simmer for 30 minutes and set aside. <br>
  4. Cook the spinach in another pan and set aside after it has shrunk to a tenth of its original volume. <br>
  5. Boil water in a pot and add salt after it has boiled. Cook the lasagna noodles in batches for 5-7 minutes. <br> 
  6. Preheat your oven to 350 degrees Fahrenheit. Add half a cup of sauce on the bottom of your 9 by 13 inch pan and spread. Add 3 noodles per layer, covering with sauce and mozzarella, and make sure every noodle has some sauce on it. It is fine to cut the noodles to fit your pan. Make sure you save plenty of mozzarella for the top of the lasagna and cover it liberally.  <br>
  7. Bake for 45 minutes and let it rest for 10 minutes after you take it out of the oven. Enjoy! <br>
  <strong> Lasagna can be stored for 3-5 days in the refrigerator and up to 3 months in the freezer. </strong> `,
  },
  eggtarts: {
    recipe: "Hong Kong Egg Tarts",
    ingredients: `<strong>Wrapper</strong> <br>
    2 cups of all-purpose flour <br> 200g room temperature cubed butter <br> 3 tbsp cold water <br> 1/4 tsp salt
    <strong>Custard</strong> <br>
    1/2 cup sugar <br> 1 cup hot water <br> 1/2 cup evaporated milk <br> 4 large eggs <br> 1 tsp vanilla extract`,
    instructions: `<strong>Servings:</strong> 18 tarts <br>
    <strong>Cooking Time:</strong> 1 30 hours prep, 30 minutes cook <br>
    You should adjust the ingredients and quantities your needs or desires. <br>
    
    1. Mix the flour, salt, and butter in a bowl and combine with the water. Use your hands to smush the butter in. After it is incorporated, you can start to add the water. Try to add as little as possible, until the dough can be combined into one piece. It will be crumbly and a bit dry. Cover and refrigerate the dough until it firms up and hydrates.<br>
    2. After the dough has chilled, roll it out into a 8 by 16 inch rectangle. Fold each end over so that the sheet is now 3 even layers. Turn the dough 90 degrees and roll it out again. Chill if the dough feels oily. Laminate the dough 2 more times before putting it back in the fridge for an hour. <br>
    3. To make the custard, dissolve the sugar in the hot water and let it cool before adding the rest of the ingredients. Mix well and pour through a fine mesh strainer to remove any solids. <br>
    4. Roll out the dough 0.2 inch or 5mm thick and cut circles to fit your tins, roughly a 4 inch diameter. Reuse the extra dough to make more shells and refrigerate as needed. <br>
    5. Preheat your oven to 350 degrees Fahrenheit. Put the tart shells in your desired container with some of it over the edge as the shell will shrink as it bakes. Pour the custard into the shell, leaving a bit of space at the top. You may want to fill every shell first before topping them off to be safe. <br>
    6. Bake the egg tarts for 25 to 30 minutes, and take them out when a toothpick can stick into the centre of the tart. Let them cool for 10 minutes before taking them out of the mold/tin. Enjoy! <br>
    <strong>Egg tarts can be stored for 3-5 days in the refrigerator.</strong>`,
  },
  shrimpwraps: {
    recipe: "Shrimp Wraps",
    ingredients: `<strong>Wrap</strong> <br>
    4 cups of all-purpose flour <br> 1/2 cup hot water <br> 12 tbsp greek yogurt <br> 1/2 tbsp salt
    <strong>Shrimp</strong> <br>
    900g peeled shrimp<br> cooking oil of your choice <br> 1/2 tbsp spicy chili powder (cayenne is fine) <br> 5 cloves minced garlic <br> 1 tbsp minced ginger <br> 1 tsp salt <br> 1 tsp pepper <br> 1/2 cup apple cider vinegar <br> 3 tbsp cup soy sauce <br> 3 tbsp maple syrup <br> 1 tsp sesame oil
    <strong>Optional</strong <br>
    Avocado, Cabbage, rice`,
    instructions: `<strong>Servings:</strong> 18 wraps <br>
    <strong>Cooking Time:</strong> 2 hours prep, 1 hour cook <br>
    You should adjust the ingredients and quantities your needs or desires. <br>
    
    1. Mix the flour, water, and yogurt in a bowl and combine with a chopstick or other utensil. The dough should be easy to knead and feel wet without sticking to your fingers when you are done. Cover for at least 30 minutes to let it rest before you start making wraps. <br>
    2. Split the dough into 1.5 to 2 inch balls based on your pan size and roll them out to 1/8 inch. I roll them out to 75% of my desired thickness and stretch the dough with my hands to finish them. <br>
    3. Cook them on medium heat with a dry pan, flipping after they have puffed which takes around 2 minutes per side. <br>
    4. Season the shrimp with salt, pepper, and some chili powder. Add oil to a pan and sear the shrimp on medium-high heat. They should be 3/4 cooked when you flip them and easily release from the pan. It takes about 5-7 on the first side and 2 minutes after you flip. Put the shrimp in a bowl and set to the side. <br>
    5. Add a bit of oil if needed and fry the garlic and ginger in the same pan at medium heat. After 2-3 minutes when they are translucent and have some colour, add in the vinegar. Use it to scrape off anything that has stuck onto the bottom or sides of the pan before adding the soy sauce, maple syrup, and remaining chili powder. <br>
    6. After the mixture has thickened a bit and can coat the bottom of a spoon, taste and adjust the amount of soy sauce or maple syrup to your liking. Add the sesame oil and shrimp and mix well. Serve hot and eat with the wraps. If you have rice, you can stir it around the pan to get some extra flavour. I usually put some rice and avocado in my wraps to absorb the juices. Enjoy! <br>
    <strong>Shrimp wraps can be stored for up to 3 days in the refrigerator.</strong>`,
  },
};

async function findRecipe(nameOfRecipe) {
  // const uri = process.env.MONGO_URI;
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

router.use(express.static(__dirname + "/public"));

router.get("/wontons", async (req, res) => {
  const rec = "Chinese Wontons";
//   const recipeinfo = await findRecipe(rec);
  const recipeinfo = recipeMap.wontons;
  const Img = "img/wontons.png";

  res.render("recipes/new", { recipeinfo: recipeinfo, imgname: Img }); //pass in values here
});

router.get("/lasagna", async (req, res) => {
  const rec = "Lasagna";
//   const recipeinfo = await findRecipe(rec);
  const recipeinfo = recipeMap.lasagna;
  const Img = "img/lasagna.png";

  res.render("recipes/new", { recipeinfo: recipeinfo, imgname: Img }); //pass in values here
});

router.get("/shrimpwraps", async (req, res) => {
  const rec = "Shrimp Wraps";
//   const recipeinfo = await findRecipe(rec);
  const recipeinfo = recipeMap.shrimpwraps;
  const Img = "img/shrimpwrap.png";

  res.render("recipes/new", { recipeinfo: recipeinfo, imgname: Img }); //pass in values here
});

router.get("/pizza", async (req, res) => {
  // if its /pizza just query for pizza and return one recipe
  const rec = "Pizza";
//   const recipeinfo = await findRecipe(rec);
  const recipeinfo = recipeMap.pizza;
  const Img = "img/pizza.png";

  res.render("recipes/new", { recipeinfo: recipeinfo, imgname: Img }); //pass in values here
});

router.get("/eggtarts", async (req, res) => {
  const rec = "Hong Kong Egg Tarts";
//   const recipeinfo = await findRecipe(rec);
  const recipeinfo = recipeMap.eggtarts;  
  const Img = "img/eggtarts.png";

  res.render("recipes/new", { recipeinfo: recipeinfo, imgname: Img }); //pass in values here
});

router.get("/baozi", async (req, res) => {
  const rec = "Chinese Steamed Vermicelli Baozi";
//   const recipeinfo = await findRecipe(rec);
  const recipeinfo = recipeMap.baozi;
  const Img = "img/baozi.png";

  res.render("recipes/new", { recipeinfo: recipeinfo, imgname: Img }); //pass in values here
});

module.exports = router;

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
