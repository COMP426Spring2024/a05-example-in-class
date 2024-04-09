import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/ingredients', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.get('/ingredients/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
});

app.post('/ingredients', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
})

app.put('/ingredients/:id', (req, res) => {
    // Replace with your code
    res.status(500).send("Needs to be implemented");
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

app.listen(port, () => {
    console.log('Running...');
})