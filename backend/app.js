const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const Offer = require('./models/offers');
const Link = require('./models/links');
const Promotions = require('./models/promotions');

const app = express();

mongoose
    .connect(
        'mongodb+srv://seva:aRhgfGuPNag7oelx@cluster0.oszda.mongodb.net/shopDB?retryWrites=true&w=majority',
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

app.post('/api/posts', ({ body }, res, next) => {
    const post = new Post({
        title: body.title,
        comments: body.comments,
    });
    post.save();
    res.status(200).json({
        meesage: 'Successful',
    });
});

app.get('/api/posts', async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json({
        meesage: 'Successful',
        posts,
    });
});

// offers

app.post('/api/offers', ({ body }, res, next) => {
    const offer = new Offer({
        icon: body.icon,
    });
    offer.save();
    res.status(200).json({
        meesage: 'Successful',
    });
});

app.get('/api/offers', async (req, res, next) => {
    const offers = await Offer.find();
    res.status(200).json({
        offers,
    });
});

// links

app.post('/api/links', ({ body }, res, next) => {
    const link = new Link({
        text: body.text,
        link: body.link,
    });
    link.save();
    res.status(200).json({
        meesage: 'Successful',
    });
});

app.get('/api/links', async (req, res, next) => {
    const links = await Link.find();
    res.status(200).json({
        links,
    });
});

// promotion

app.post('/api/promotions', ({ body }, res, next) => {
    const promotion = new Promotions({
        title: body.title,
        subTitle: body.subTitle,
        image: body.image,
        link: body.link,
    });
    promotion.save();
    res.status(200).json({
        meesage: 'Successful',
    });
});

app.get('/api/promotions', async (req, res, next) => {
    const promotions = await Promotions.find();
    res.status(200).json({
        promotions,
    });
});

module.exports = app;
