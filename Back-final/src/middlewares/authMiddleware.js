const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Obtiene clave secreta para firmar los tokens desde las variables de entorno

const authenticateToken = (req, res, next) => { // Define una función middleware llamada authenticateToken que verifica la autenticación del token
  if (!secret) return res.status(500).json({ error: 'JWT_SECRET not defined' }); // Verifica si la clave secreta está definid, si no responde con un error 500

  const authHeader = req.headers['authorization']; // Obtiene autorización de la solicitud
  const token = authHeader && authHeader.split(' ')[1]; // Extrae el token, si existe se espera que esté en el formato "Bearer <token>"

  if (!token) return res.status(401).json({ error: 'Token requerido' }); // Si no se entrega un token envia un error 401 (no autorizado)

  jwt.verify(token, secret, (err, user) => { // Verifica el token usando la clave secreta
    if (err) return res.status(403).json({ error: 'Token inválido' }); // Si hay un error en la verificación envia un error 403 (Prohibido)

    req.user = user; // Si el token es válido, entrega el objeto de usuario decodificado a req.user para que esté disponible en las siguientes funciones middleware.
    next(); // Llama a la siguiente función middleware en la cadena
  });
};

module.exports = { authenticateToken }; // Exporta la función