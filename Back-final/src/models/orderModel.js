const getAllOrders = async (db) => {
  try { //try maneja errores
    const result = await db.query('SELECT * FROM pedidos'); // Realiza una consulta a la db para seleccionar todos los registros de la tabla 'pedidos'
    return result.rows; // Devuelve las filas obtenidas de la consulta
  } catch (error) { // Captura cualquier error que ocurra en try
    throw new Error('Error al obtener pedidos'); // Lanza un nuevo error con un mensaje específico si ocurre un error
  }
};

const getOrderById = async (db, pedidoId) => { // función que obtiene un pedido por su ID.
  try {
    const result = await db.query('SELECT * FROM pedidos WHERE pedido_id = $1', [pedidoId]); // consulta para seleccionar un pedido específico usando su ID
    if (result.rows.length === 0) throw new Error('Pedido no encontrado'); // Si no se encuentra ningún pedido envia un error
    return result.rows[0]; // Devuelve el primer pedido encontrado
  } catch (error) { 
    throw new Error('Error al obtener pedido'); // Lanza un nuevo error con un mensaje específico si ocurre un error
  }
};

const createOrder = async (db, { cliente_id, fecha_pedido, total }) => { // función que crea un nuevo pedido en la base de datos
  try { // maneja errores
    const result = await db.query( // Realiza una consulta para insertar un nuevo pedido en la tabla 'pedidos'
      'INSERT INTO pedidos (cliente_id, fecha_pedido, total) VALUES ($1, $2, $3) RETURNING *', // La consulta para insertar y devolver el nuevo registro
      [cliente_id, fecha_pedido, total] // Los valores a insertar en la consulta
    );
    return result.rows[0]; // Devuelve el nuevo pedido creado.
  } catch (error) { // Captura cualquier error 
    throw new Error('Error al crear pedido'); // Lanza un nuevo error con un mensaje específico si ocurre un error
  }
};

module.exports = { getAllOrders, getOrderById, createOrder }; // Exporta las funciones