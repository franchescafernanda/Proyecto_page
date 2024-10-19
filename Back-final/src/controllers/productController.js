const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts(req.db);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching products');
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductById(req.db, id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching product');
  }
};

const createProduct = async (req, res) => {
  const { nombre, descripcion, image_url, precio } = req.body;
  try {
    const product = await productModel.createProduct(req.db, { nombre, precio, descripcion, image_url });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating product');
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};