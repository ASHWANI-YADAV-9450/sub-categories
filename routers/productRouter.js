// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST /products (Create or Update)
router.post('/products', productController.createOrUpdateProduct);
router.get('/products', productController.getAllProducts);

module.exports = router;
