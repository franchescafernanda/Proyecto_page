const orderModel = require('../controllers/userController');

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders(req.db);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching orders');
  }
};

module.exports = { getAllOrders };