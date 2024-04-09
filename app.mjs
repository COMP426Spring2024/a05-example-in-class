import express from 'express';
import bodyParser from 'body-parser';
import {Ingredient} from './ingredient.mjs';

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
        res.status(400).send("Bad request");
        return;
    }
    ing.setName(req.body.name);
    res.json(true);
})

app.delete('/ingredients/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.get('/recipes', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.get('/recipes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.post('/recipes', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.put('/recipes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implements");
});

app.delete('/recipes/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implements");
});

Ingredient.create({name: "chicken"});
Ingredient.create({name: "lemon"});
Ingredient.create({name: "wine"});

app.listen(port, () => {
    console.log('Running...');
})