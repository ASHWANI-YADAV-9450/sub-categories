// controllers/productController.js

const productModel = require("../models/productModel");

// Helper function to flatten nested options into attributes
function extractAttributes(options, attributes = {}) {
  for (const option of options) {
    if (option.children && option.children.length > 0) {
      attributes[option.name] = option.children.map(child => child.name);
      for (const child of option.children) {
        if (child.children && child.children.length > 0) {
          extractAttributes(child.children, attributes);
        }
      }
    }
  }
  return attributes;
}

exports.createOrUpdateProduct = async (req, res) => {
  const { _id, name, options } = req.body;

  try {
    const attributes = extractAttributes(options);

    let product;
    if (_id) {
      // Update product
      product = await productModel.findByIdAndUpdate(
        _id,
        { name, options, attributes },
        { new: true }
      );
    } else {
      // Create new product
      product = new productModel({ name, options, attributes });
      await product.save();
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//#region Get All Products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await productModel.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
//#region   

