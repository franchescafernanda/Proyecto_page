const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// Productos
router.get('/productos', productController.getAllProducts); // Ruta para obtener todos los productos
router.get('/productos/:id', productController.getProductById); // Ruta para obtener un producto por ID
router.post('/productos', authenticateToken, productController.createProduct); // Ruta para crear un producto

// Pedidos
router.get('/pedidos', authenticateToken, orderController.getAllOrders); // Ruta para obtener todos los pedidos

// Usuarios
router.post('/auth/login', userController.loginUser); // Ruta para el login de usuario
router.post('/auth/register', userController.createUser); // Ruta para el registro de usuario

module.exports = router;