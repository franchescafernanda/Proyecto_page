const orderModel = require('../controllers/userController');

const getAllOrders = async (req, res) => { //funcion asincrona, (req=solicitud/ res=respuesta)
  try { //try ejecuta la funcion getAllOrders de orderModel 
    const orders = await orderModel.getAllOrders(req.db); //le paso (req.db) se esta usando la db para la solicitud
    res.status(200).json(orders);
  } catch (error) { //si ocurre un error utilizo el catch y me lanza un error con un estado http 500
    console.error(error);
    res.status(500).send('Error fetching orders');
  }
};

module.exports = { getAllOrders }; //exportacion de mi funcion