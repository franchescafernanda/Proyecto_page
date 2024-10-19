const {pool} = require ("../../db")


// Función para obtener todos los usuarios
const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM perfiles');
    console.log (result)
    return result.rows;
  } catch (error) {
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
};

// Función para crear un nuevo usuario
const createUser = async (user) => {
  console.log (user,"model")
  const { name, lastName, email, contraseña } = user;
  try {
    const result = await pool.query(
      'INSERT INTO perfiles (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, lastName, email, contraseña]
    );
    return result.rows[0];
  } catch (error) {
    console.log (error.message)
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

module.exports = { getAllUsers, createUser };
