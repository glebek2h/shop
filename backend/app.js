const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/orders',(req, res, next) => {
  const orders = [
    {
      id: 1, 
      name: 'gleb'
    },
    {
      id: 2, 
      name: 'kiryl'
    }
  ];
  res.status(200).json({
    meesage: 'Successful',
    orders
  });
});

module.exports = app;
