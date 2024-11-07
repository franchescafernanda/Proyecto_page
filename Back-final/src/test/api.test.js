const request = require('supertest');
const app = require('../index');

describe('API Tests', () => { // Inicia pruebas para la Api

  it('should fetch all products', async () => { // prueba para obtener todos los productos
    const response = await request(app).get('/api/productos'); // solicitud GET a la ruta /api/productos
    expect(response.statusCode).toBe(200); // Verifica que el código de estado de la respuesta sea 200 (OK)
    expect(Array.isArray(response.body)).toBe(true); // comprueba que el cuerpo de la respuesta sea un array.
  });

  it('should fetch a single product by ID', async () => { // prueba para obtener un producto específico por id
    const response = await request(app).get('/api/productos/1'); //solicitud GET a la ruta /api/productos/1
    expect(response.statusCode).toBe(200); // Verifica que el código de estado de la respuesta sea 200 (OK)
    expect(response.body).toHaveProperty('id_productos'); // comprueba que el cuerpo de la respuesta tenga la propiedad 'id_productos'.
  });

  it('should return 404 for a non-existent product', async () => { // prueba para un producto que no existe
    const response = await request(app).get('/api/productos/99999'); // solicitud GET a la ruta /api/productos/99999
    expect(response.statusCode).toBe(404); // comprueba que el código de estado de la respuesta sea 404 (No encontrado)
  });

  it('should create a new product', async () => { // prueba para crear un nuevo producto
    const newProduct = { // Crea un objeto que representa el nuevo producto
      nombre: 'Producto Test', // Nombre del producto
      precio: 9.99, // Precio
      descripcion: 'Descripción de prueba', // Descripción
      image_url: 'http://example.com/image.jpg', // URL de la img
    };

    const response = await request(app).post('/api/productos').send(newProduct); // solicitud POST a la ruta /api/productos enviando el nuevo producto
    expect(response.statusCode).toBe(201); // comprueba que el código de estado de la respuesta sea 201 (Creado)
    expect(response.body).toMatchObject(newProduct); // comprueba que el cuerpo de la respuesta coincida con el nuevo producto
  });
});