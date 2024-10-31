const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Función para crear tablas
const createTables = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id_user SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS perfiles (
      id_perfil SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS formularios (
      id_form SERIAL PRIMARY KEY,
      id_perfil INTEGER REFERENCES perfiles(id_perfil),
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      image BYTEA,
      descripcion TEXT
    );

    CREATE TABLE IF NOT EXISTS productos (
      id_productos SERIAL PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL UNIQUE,
      precio DECIMAL NOT NULL,
      descripcion TEXT,
      image_url VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS pedidos (
      pedido_id SERIAL PRIMARY KEY,
      cliente_id INTEGER REFERENCES usuarios(id_user),
      fecha_pedido DATE NOT NULL,
      total DECIMAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS detalle_pedidos (
      detalle_id SERIAL PRIMARY KEY,
      pedido_id INTEGER REFERENCES pedidos(pedido_id),
      producto_id INTEGER REFERENCES productos(id_productos),
      cantidad INTEGER NOT NULL,
      precio_unitario DECIMAL NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Tablas creadas o ya existen.");
  } catch (err) {
    console.error("Error creando tablas:", err);
  }
};

// Inicializar la base de datos
const data_init_base = async () => {
  await createTables();
};

module.exports = { data_init_base, pool };