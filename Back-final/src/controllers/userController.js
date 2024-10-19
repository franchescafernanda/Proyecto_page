const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Recibida solicitud de inicio de sesión con email:", email);
    const users = await userModel.getAllUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id_user: user.id_user }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

const createUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    if (password) {
      console.log (req.body,"controller")
      const hashedPassword = await bcrypt.hash(password, 10);
      // Encriptar la contraseña
      const newUser = await userModel.createUser({
        name,
        lastName,
        email,
        contraseña: hashedPassword,
      });

      res.status(201).json(newUser);
    } else {
      console.log (req.body)


      res.status(400).json({ mensaje: "Debes ingresar contraseña requerida" });
    }
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

module.exports = {
  loginUser,
  createUser,
};
