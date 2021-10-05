const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const Order = require('./models/orders');
const Profile = require('./models/profile');
const Form = require('./models/form');
// const RemoveAvatar = require('./models/removeAvatar');

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

// ********* posts *********

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

// ********* orders *********

app.post('/api/orders', ({ body }, res, next) => {
    const order = new Order({
        orderNumber: body.orderNumber,
        orderingTime: body.orderingTime,
        shopName: body.shopName,
        shopLink: body.shopLink,
        sellerLink: body.sellerLink,
        total: body.total,
        orderItems: body.orderItems,
    });
    order.save();
    res.status(200).json({
        message: 'Successful',
    });
});

app.get('/api/orders', async (req, res, next) => {
    const orders = await Order.find();
    res.status(200).json({
        message: 'Successful',
        orders,
    });
});

app.delete('/api/orders/:id', async (req, res, next) => {
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Order deleted!' });
});

// ********* profile *********

app.post('/api/profile', ({ body }, res, next) => {
    const post = new Profile({
        name: body.name,
        email: body.email,
        avatar: body.avatar,
    });
    post.save();
    res.status(200).json({
        meesage: 'Successful',
    });
});

app.get('/api/profile', async (req, res, next) => {
    const profile = await Profile.find();
    res.status(200).json({
        profile,
    });
});

app.put('api/profile', (req, res, next) => {
    const post = new Form({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
    });

    Form.updateOne({ _id: req.params.id }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
});


module.exports = app;
