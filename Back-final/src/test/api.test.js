const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {

  it('should fetch all products', async () => {
    const response = await request(app).get('/api/productos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a single product by ID', async () => {
    const response = await request(app).get('/api/productos/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id_productos');
  });

  it('should return 404 for a non-existent product', async () => {
    const response = await request(app).get('/api/productos/99999');
    expect(response.statusCode).toBe(404);
  });

  it('should create a new product', async () => {
    const newProduct = {
      nombre: 'Producto Test',
      precio: 9.99,
      descripcion: 'Descripción de prueba',
      image_url: 'http://example.com/image.jpg',
    };

    const response = await request(app).post('/api/productos').send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newProduct);
  });
});