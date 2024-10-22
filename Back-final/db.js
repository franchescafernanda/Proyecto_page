const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect(function(err,client,done){
  if (err) console.log (err)
})

const create_tables=() => {
  return `CREATE TABLE if not exists usuarios (
  id_user SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE if not exists perfiles (
  id_perfil SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE if not exists formularios (
  id_form SERIAL PRIMARY KEY,
  id_perfil INTEGER REFERENCES perfiles(id_perfil),
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  image BYTEA,
  descripcion TEXT
);

CREATE TABLE if not exists productos (
  id_productos SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  precio DECIMAL NOT NULL,
  descripcion TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE if not exists pedidos (
  pedido_id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES usuarios(id_user),
  fecha_pedido DATE NOT NULL,
  total DECIMAL NOT NULL
);

CREATE TABLE if not exists detalle_pedidos (
  detalle_id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(pedido_id),
  producto_id INTEGER REFERENCES productos(id_productos),
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL NOT NULL
);`
}

const insert =() => {
  return `INSERT INTO productos (nombre, precio, descripcion, image_url) VALUES 
('Bluza juvenil', 8000, 'Bluza de dama, 100% algodón','https://yoyojeans.vteximg.com.br/arquivos/ids/188111/BLUSA-32137204-AZUL-EST_1.jpg?v=638445751310300000?1728345600086'), 
('Abrigo dama', 15000, 'Abrigo color beigh','https://http2.mlstatic.com/D_NQ_NP_860702-CBT71844186113_092023-O.webp'),
('Tacon', 20000, 'Tacones mujer, tono verde','https://weide.cl/cdn/shop/products/P-GH52Z_verde-1.webp?v=1678250556&width=1500'),
('Mini-Falda', 6500, 'Falda corta, material 100% algodón','https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/120471537_01/w=800,h=800,fit=pad'),
('Zapatillas', 15000, 'Zapatillas con plataforma','https://www.dimarsa.cl/media/catalog/product/m/a/marcasskechers73690-crl-rosado1jpeg_0_6.jpg'),
('Conjunto dama', 11000, 'Conjunto negro sexy','https://faunasalud.cl/wp-content/uploads/2022/11/137-0103.jpg');`
}

const data_init_base=async() => {
  await pool.query(create_tables())
  await pool.query(insert())
}


module.exports ={data_init_base,pool}