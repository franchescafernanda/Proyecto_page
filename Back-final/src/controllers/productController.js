const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => { //funcion asincrona, (req=solicitud/ res=respuesta)
  try {  //try ejecuta la funcion getAllProducts de productModel 
    const products = await productModel.getAllProducts(req.db); //le paso (req.db) se esta usando la db para la solicitud
    res.status(200).json(products);
  } catch (error) { //si ocurre un error utilizo el catch y me lanza un error con un estado http 500
    console.error(error);
    res.status(500).send('Error fetching products');
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params; //extrae el id del parametro de la solicitud
  try {
    const product = await productModel.getProductById(req.db, id);
    res.status(200).json(product); //Si encuentra el producto, envía una respuesta con un estado HTTP 200 y el producto en formato JSON.
  } catch (error) {
    console.error(error); //si captura algun error me enviara un mensaje de error 500
    res.status(500).send('Error fetching product'); 
  }
};

const createProduct = async (req, res) => { //funcion crear producto
  const { nombre, descripcion, image_url, precio } = req.body; //extrae los datos del nuevo producto de la solicitud (req,res)
  try {                                                        //que incluye nombre, descrip, img y precio
    const product = await productModel.createProduct(req.db, { nombre, precio, descripcion, image_url });
    res.status(201).json(product); //llama a createProduct del productModel, pasando req.dby un objeto con los datos del producto. Si todo es exitoso, se envía una respuesta con un estado HTTP 201 (Creado) y el nuevo producto en formato JSON.
  } catch (error) {
    console.error(error); //si captura algun error me enviara un mensaje de error 500
    res.status(500).send('Error creating product');
  }
};

module.exports = {  //exportacion de todas las funciones utilizadas
  getAllProducts,
  getProductById,
  createProduct,
};