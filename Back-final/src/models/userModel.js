const {pool} = require ("../../db")


// Función para obtener todos los usuarios
const getAllUsers = async () => { // función que obtiene todos los usuarios de la base de datos
  try { 
    const result = await pool.query('SELECT * FROM perfiles'); // Realiza una consulta a la db para seleccionar todos los registros de la tabla 'perfiles'
    console.log(result); // Imprime el resultado de la consulta en la consola para depuración
    return result.rows; // Devuelve las filas obtenidas de la consulta
  } catch (error) { 
    throw new Error('Error al obtener usuarios: ' + error.message); // Lanza un nuevo error con un mensaje específico si ocurre un error, incluyendo el mensaje del error original
  }
};

// Función para crear un nuevo usuario
const createUser  = async (user) => { 
  console.log(user, "model"); // Imprime el objeto 'user' en la consola para depuración
  const { name, lastName, email, contraseña } = user; // Desestructura las propiedades del objeto 'user'
  try { 
    const result = await pool.query( // Realiza una consulta para insertar un nuevo usuario en la tabla 'perfiles'
      'INSERT INTO perfiles (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *', // consulta aql para insertar y devolver el nuevo registro.
      [name, lastName, email, contraseña] // Los valores a insertar en la consulta
    );
    return result.rows[0]; // Devuelve el nuevo usuario creado
  } catch (error) { 
    console.log(error.message);
    throw new Error('Error al crear usuario: ' + error.message); // envia nuevo error con un mensaje específico si ocurre un error, ademas el mensaje del error original
  }
};

module.exports = { getAllUsers, createUser  }; // Exporta las funciones