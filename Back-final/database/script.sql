-- Active: 1724462118558@@127.0.0.1@5432@tienda_mascotas
-- Crear tablas de la base de datos

CREATE DATABASE tienda_mascotas
\c tienda_mascotas

CREATE TABLE usuarios (
  id_user SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE perfiles (
  id_perfil SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE formularios (
  id_form SERIAL PRIMARY KEY,
  id_perfil INTEGER REFERENCES perfiles(id_perfil),
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  image BYTEA,
  descripcion TEXT
);

CREATE TABLE productos (
  id_productos SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  precio DECIMAL NOT NULL,
  descripcion TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE pedidos (
  pedido_id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES usuarios(id_user),
  fecha_pedido DATE NOT NULL,
  total DECIMAL NOT NULL
);

CREATE TABLE detalle_pedidos (
  detalle_id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(pedido_id),
  producto_id INTEGER REFERENCES productos(id_productos),
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL NOT NULL
);


INSERT INTO productos (nombre, precio, descripcion, image_url) VALUES 
('Cama para perro', 12000, 'Cama acolchonada, 100% algodón','https://dojiw2m9tvv09.cloudfront.net/11787/product/dogitcamarectangular7043.jpg'), 
('Juguete para gato', 8000, 'Juguete interactivo con plumas','https://ss345.liverpool.com.mx/xl/1103149122.jpg'),
('Juguete', 3500, 'Juguete para perro','https://space-theprofit.nyc3.cdn.digitaloceanspaces.com/public/Products/juguete-para-perros-forma-de-hueso_6579285a435f1.webp'),
('Rascador', 10000, 'Juguete para gato','https://http2.mlstatic.com/D_NQ_NP_896438-MLU76434050926_052024-O.webp'),
('Peinetas', 5000, 'Juguete para perro','https://space-theprofit.nyc3.cdn.digitaloceanspaces.com/public/Products/pack-de-accesorios-de-aseo-para-mascotas_6581a594360b5.webp'),
('Arnes para conejo', 20000, 'Accesorio para conejos','https://faunasalud.cl/wp-content/uploads/2022/11/137-0103.jpg') ON CONFLICT(nombre) DO NOTHING; 

