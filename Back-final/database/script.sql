-- Active: 1724450487622@@127.0.0.1@5432@tienda_franchesca
-- Crear tablas de la base de datos

CREATE DATABASE tienda_franchesca
\c tienda_franchesca

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
('Bluza juvenil', 8000, 'Bluza de dama, 100% algodón','https://yoyojeans.vteximg.com.br/arquivos/ids/188111/BLUSA-32137204-AZUL-EST_1.jpg?v=638445751310300000?1728345600086'), 
('Abrigo dama', 15000, 'Abrigo color beigh','https://http2.mlstatic.com/D_NQ_NP_860702-CBT71844186113_092023-O.webp'),
('Tacon', 20000, 'Tacones mujer, tono verde','https://weide.cl/cdn/shop/products/P-GH52Z_verde-1.webp?v=1678250556&width=1500'),
('Mini-Falda', 6500, 'Falda corta, material 100% algodón','https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/120471537_01/w=800,h=800,fit=pad'),
('Zapatillas', 15000, 'Zapatillas con plataforma','https://www.dimarsa.cl/media/catalog/product/m/a/marcasskechers73690-crl-rosado1jpeg_0_6.jpg'),
('Conjunto dama', 11000, 'Conjunto negro sexy','https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/128835811_01/w=1500,h=1500,fit=pad') ON CONFLICT(nombre) DO NOTHING; 

