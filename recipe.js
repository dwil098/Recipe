const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const recipes = [
  {
    recipe_id: 1,
    name: 'onion soup',
    type: 'appetizer',
    createdAt: 'dateNow()',
    instructions: 'saute garlic and onion add water and salt'
  },
  {
    recipe_id: 2,
    name: 'apple pie',
    type: 'dessert',
    createdAt: 'dateNow()',
    instructions: 'create a dough using egg flour and water, cook apple inside the dough'
  }
];

const ingredients = [
  { ingredient_id: 1, recipe_id: 1, name: 'onion', quantity: '1 bulb', condition: 'chopped' },
  { ingredient_id: 2, recipe_id: 1, name: 'salt', quantity: '1/2 teaspoon', condition: 'none' },

];


const findRecipeById = (id) => recipes.find(recipe => recipe.recipe_id === parseInt(id));
const findIngredientsByRecipeId = (recipeId) => ingredients.filter(ingredient => ingredient.recipe_id === parseInt(recipeId));


app.get('/food', (req, res) => {
  const foodList = recipes.map(recipe => ({ name: recipe.name, type: recipe.type }));
  res.status(200).json(foodList);
});


app.get('/food/:id', (req, res) => {
  const id = req.params.id;
  const recipe = findRecipeById(id);

  if (!recipe) {
    res.status(404).json({ error: 'Recipe not found' });
  } else {
    const recipeWithIngredients = { ...recipe, ingredients: findIngredientsByRecipeId(id) };
    res.status(200).json(recipeWithIngredients);
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
