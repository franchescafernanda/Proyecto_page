const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const loginUser = async (req, res) => { //loginUser maneja la solicitud de inicio de sesión
  const { email, password } = req.body; //extrae email y password de la solicitud ( req.body)
//logica
  try {
    console.log("Recibida solicitud de inicio de sesión con email:", email);
    const users = await userModel.getAllUsers(); //obtiene todos los usuarios de la base de datos
    const user = users.find((u) => u.email === email); //busca que usuario que coincide con el email

    if (!user) { //si no encuentra el usuario,envía una respuesta con un estado 401 (No autorizado) y un mensaje de error
      console.log("Usuario no encontrado");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { //Si encuentra el usuario, se compara la contraseña entregada con la contraseña encriptada usando bcrypt.compare
      console.log("Contraseña incorrecta");
      return res.status(401).json({ error: "Credenciales inválidas" });//Si la contraseña no coincide, se envía una respuesta de error
    }

    const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, {
      expiresIn: "1h", //Si las credenciales son válidas, se genera un token JWT que incluye el id_user del usuario y se envía en la respuesta
    });
    res.json({ token });
  } catch (error) { //Si ocurre un error en cualquier parte, se captura y se envía una respuesta de error con un estado 500
    console.error("Error en loginUser:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

const createUser  = async (req, res) => { // función asíncrona para la creación de un nuevo usuario
  const { name, lastName, email, password } = req.body; // Desestructura los datos de la solicitud para obtener nombre, apellido, email y contraseña
  
  try { // maneja errores.
    if (password) { // Verifica si se ha entregado una contraseña.
      console.log(req.body, "controller");
      
      const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña usando bcrypt con un salt de 10.
      // Encriptar la contraseña
      
      const newUser  = await userModel.createUser ({ // Llama a la función createUser  del modelo de usuario para crear un nuevo usuario
        name,
        lastName,
        email,
        contraseña: hashedPassword,
      });

      res.status(201).json(newUser ); // Envía una respuesta con estado 201 (Creado) y el nuevo usuario en formato JSON
    } else { // Si no se proporciona una contraseña.
      console.log(req.body);

      res.status(400).json({ mensaje: "Debes ingresar contraseña requerida" }); // Envía una respuesta con estado 400 (Solicitud incorrecta) y un mensaje de error
    }
  } catch (error) { // Captura cualquier error que ocurra en el bloque try
    console.error("Error en createUser :", error); // Imprime el error en la consola
    res.status(500).json({ error: "Error al registrar usuario" }); // Envía una respuesta con estado 500 (Error interno del servidor) + mensaje de error
  }
};

module.exports = { // Exporta las funciones
  loginUser , 
  createUser , 
};