const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose
    .connect(
        'mongodb+srv://gleb:GHc82iLQCD5iDdJM@cluster0.oszda.mongodb.net/shopDB?retryWrites=true&w=majority',
    )
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(e => {
        console.log('Connection failed! ', e);
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS',
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({ title: req.body.title, content: req.body.content });
    post.save();
    res.status(200).json({
        meesage: 'Successful',
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        { id: 1, name: 'seva' },
        { id: 2, name: 'kiryl' },
    ];
    res.status(200).json({
        meesage: 'Successful',
        posts,
    });
});

module.exports = app;
