const getAllProducts = async (db) => {
  try {
    const result = await db.query('SELECT * FROM productos');
    return result.rows;
  } catch (error) {
    console.error('Error in getAllProducts:', error.message);
    throw new Error('Error al obtener productos');
  }
};

const getProductById = async (db, id) => {
  try {
    const result = await db.query('SELECT * FROM productos WHERE id_productos = $1', [id]);
    if (result.rows.length === 0) throw new Error('Producto no encontrado');
    return result.rows[0];
  } catch (error) {
    console.error('Error in getProductById:', error.message);
    throw new Error('Error al obtener producto');
  }
};

const createProduct = async (db, { nombre, precio, descripcion, image_url }) => {
  try {
    const result = await db.query(
      'INSERT INTO productos (nombre, precio, descripcion, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, precio, descripcion, image_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error in createProduct:', error.message);
    throw new Error('Error al crear producto');
  }
};

module.exports = { getAllProducts, getProductById, createProduct };
