import express from 'express';
import bodyParser from 'body-parser';
import {Ingredient} from './ingredient.mjs';
import {Recipe} from './recipe.mjs';

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/ingredients', (req, res) => {
    res.json(Ingredient.getAllIDs());
});

app.get('/ingredients/:id', (req, res) => {
    let ing = Ingredient.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Ingredient not found");
        return;
    }
    res.json(ing.json());
});

app.post('/ingredients', (req, res) => {

    let ing = Ingredient.create(req.body);

    if (!ing) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(ing.json());
})

app.put('/ingredients/:id', (req, res) => {
    let ing = Ingredient.findByID(req.params.id);
    if (!ing) {
        res.status(404).send("Ingredient not found.");
        return;
    }
    
    if ((!req.body instanceof Object) || (req.body.name == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    ing.setName(req.body.name);
    res.json(true);
})

app.delete('/ingredients/:id', (req, res) => {
    if (Recipe.isIngredientInUse(req.params.id)) {
        res.status(400).send("Ingredient is still in use");
        return;
    } 
    Ingredient.deleteIngredientByID(req.params.id);
    res.json(true);
})

app.get('/recipes', (req, res) => {
    res.json(Recipe.getAllIDs());
});

app.get('/recipes/:id', (req, res) => {
    let recipe = Recipe.findByID(req.params.id);
    if (!recipe) {
        res.status(404).send("Recipe not found");
        return;
    }

    res.json(recipe.json(req.query.expanded != undefined));
});

app.post('/recipes', (req, res) => {

    let recipe = Recipe.create(req.body);

    if (!recipe) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(201).json(recipe.json(true));
});

app.put('/recipes/:id', (req, res) => {
    let recipe = Recipe.findByID(req.params.id);
    if (!recipe) {
        res.status(404).send("Recipe not found.");
        return;
    }
    
    if ((!req.body instanceof Object) || (req.body.name == undefined)) {
        res.status(400).send("Bad request");
        return;
    }

    recipe.setName(req.body.name);
    res.json(true);
});

app.delete('/recipes/:id', (req, res) => {
    Recipe.deleteRecipeByID(req.params.id);
    res.json(true);
});

Ingredient.create({name: "chicken"});
Ingredient.create({name: "lemon"});
Ingredient.create({name: "wine"});
Recipe.create({
    name: 'Chicken Picatta',
    steps: [
        {
            seq_no: 1,
            instruction: "Heat oil in pan",
            ingredients: []
        },
        {
            seq_no: 2,
            instruction: "Pan fry chicken cutlets",
            ingredients: [1]
        },
        {
            seq_no: 2,
            instruction: "Make lemon sauce",
            ingredients: [2,3]
        },
        {
            seq_no: 3,
            instruction: "Combine and serve",
            ingredients: [1,2,3]
        }
    ]
});

app.listen(port, () => {
    console.log('Running...');
})