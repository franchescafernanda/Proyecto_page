const getAllProducts = async (db) => { 
  try { //maneja errores.
    const result = await db.query('SELECT * FROM productos'); // consulta a la db para seleccionar todos los registros de la tabla 'productos'
    return result.rows; // Devuelve las filas obtenidas de la consulta
  } catch (error) { // Captura errores
    console.error('Error in getAllProducts:', error.message); // mensaje de error en la consola
    throw new Error('Error al obtener productos'); // Lanza un nuevo error con un mensaje específico si ocurre un error
  }
};

const getProductById = async (db, id) => { // Define una función asíncrona que obtiene un producto específico por su ID
  try {
    const result = await db.query('SELECT * FROM productos WHERE id_productos = $1', [id]); // Realiza una consulta para seleccionar un producto específico usando su ID
    if (result.rows.length === 0) throw new Error('Producto no encontrado'); // Si no se encuentra ningún producto, envia un error
    return result.rows[0]; // Devuelve el primer producto encontrado.
  } catch (error) { 
    console.error('Error in getProductById:', error.message); // mensaje de error en la consola
    throw new Error('Error al obtener producto'); // Lanza un nuevo error con un mensaje específico si ocurre un error
  }
};

const createProduct = async (db, { nombre, precio, descripcion, image_url }) => { // función asíncrona que crea un nuevo producto
  try { 
    const result = await db.query( // Realiza una consulta para insertar un nuevo producto en la tabla 'productos'
      'INSERT INTO productos (nombre, precio, descripcion, image_url) VALUES ($1, $2, $3, $4) RETURNING *', // La consulta sql para insertar y devolver el nuevo registro
      [nombre, precio, descripcion, image_url] // Los valores a insertar en la consulta
    );
    return result.rows[0]; // Devuelve producto creado
  } catch (error) {
    console.error('Error in createProduct:', error.message);
    throw new Error('Error al crear producto'); // Lanza un nuevo error con un mensaje específico si ocurre un error
  }
};

module.exports = { getAllProducts, getProductById, createProduct }; // Exporta las funciones