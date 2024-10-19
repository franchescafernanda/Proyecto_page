const getAllOrders = async (db) => {
  try {
    const result = await db.query('SELECT * FROM pedidos');
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener pedidos');
  }
};

const getOrderById = async (db, pedidoId) => {
  try {
    const result = await db.query('SELECT * FROM pedidos WHERE pedido_id = $1', [pedidoId]);
    if (result.rows.length === 0) throw new Error('Pedido no encontrado');
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al obtener pedido');
  }
};

const createOrder = async (db, { cliente_id, fecha_pedido, total }) => {
  try {
    const result = await db.query(
      'INSERT INTO pedidos (cliente_id, fecha_pedido, total) VALUES ($1, $2, $3) RETURNING *',
      [cliente_id, fecha_pedido, total]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error al crear pedido');
  }
};

module.exports = { getAllOrders, getOrderById, createOrder };