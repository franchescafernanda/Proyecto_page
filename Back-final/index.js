const express = require('express');
const cors = require('cors'); 
const { pool } = require('./db'); 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());



//PRODUCTOS

// Endpoint para obtener todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});


// Endpoint para obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM productos WHERE id_productos = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
});



// Endpoint para agregar un nuevo producto
app.post('/api/productos', async (req, res) => {
    const { nombre, precio, descripcion, image_url } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, precio, descripcion, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, precio, descripcion, image_url]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al agregar producto:', error);
        if (error.code === '23505') { 
            return res.status(409).json({ error: 'El producto ya existe.' });
        }
        res.status(500).json({ error: 'Error al agregar producto.' });
    }
});





// USUARIOS


// Middleware de autenticación
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

// Endpoint para registrar un nuevo usuario
app.post('/api/auth/register', async (req, res) => {
    const { nombre, apellido, email, password } = req.body

    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    try {
        const existingUser = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'El correo ya está en uso' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, apellido, email, hashedPassword]
        )

        const newUser = result.rows[0]
        const token = jwt.sign({ id: newUser.id_user, email: newUser.email }, process.env.SECRET_KEY)

        res.status(201).json({ token, user: { id: newUser.id_user, nombre: newUser.nombre, apellido: newUser.apellido, email: newUser.email } })
        /* console.log('newUser --->', newUser); */
    } catch (error) {
        console.error('Error al registrar usuario:', error)
        res.status(500).json({ error: 'Error al registrar el usuario' })
    }
})

// Endpoint para iniciar sesión
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
        const user = userResult.rows[0]

        if (!user) {
            return res.status(400).json({ error: 'Credenciales incorrectas' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Credenciales incorrectas' })
        }

        const token = jwt.sign({ id: user.id_user, email: user.email }, process.env.SECRET_KEY)

        res.status(200).json({ token, user: { id: user.id_user, nombre: user.nombre, apellido: user.apellido, email: user.email } })
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        res.status(500).json({ error: 'Error al iniciar sesión' })
    }
})

//Endpoint para capturar los datos del usuario
app.get('/api/auth/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; 
        const result = await pool.query('SELECT id_user, nombre, apellido, email FROM usuarios WHERE id_user = $1', [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    }
})


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});