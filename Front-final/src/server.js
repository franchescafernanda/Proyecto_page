import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
    res.json([
        { 
            id: 1, 
            name: "Bluza juvenil", 
            description: "Bluza de dama, 100% algodón", 
            price: 8000, 
            imageUrl: "https://yoyojeans.vteximg.com.br/arquivos/ids/188111/BLUSA-32137204-AZUL-EST_1.jpg?v=638445751310300000?1728345600086"
        },
        { 
            id: 2, 
            name: "Abrigo dama", 
            description: "Abrigo color beigh", 
            price: 15000, 
            imageUrl: "https://http2.mlstatic.com/D_NQ_NP_860702-CBT71844186113_092023-O.webp"
        },
        {   
            id: 3, 
            name: "Tacon", 
            description: "Tacones mujer, tono verde", 
            price: 20000, 
            imageUrl: "https://weide.cl/cdn/shop/products/P-GH52Z_verde-1.webp?v=1678250556&width=1500" 
        },
        {   
            id: 4, 
            name: "Mini-Falda", 
            description: "Falda corta, material 100% algodón", 
            price: 6500, 
            imageUrl: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/120471537_01/w=800,h=800,fit=pad" 
        },
        {   
            id: 5, 
            name: "Zapatillas", 
            description: "Zapatillas con plataforma", 
            price: 15000,
            imageUrl: "https://www.dimarsa.cl/media/catalog/product/m/a/marcasskechers73690-crl-rosado1jpeg_0_6.jpg"
        },
        {   
            id: 6, 
            name: "Conjunto dama",
            description: "Conjunto negro sexy",
            price: 11000,
            imageUrl: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/128835811_01/w=1500,h=1500,fit=pad" 
        },
    ]);
});

// Endpoint para obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const products = [
        { 
            id: 1, 
            name: "Bluza juvenil", 
            description: "Bluza de dama, 100% algodón", 
            price: 8000, 
            imageUrl: "https://yoyojeans.vteximg.com.br/arquivos/ids/188111/BLUSA-32137204-AZUL-EST_1.jpg?v=638445751310300000?1728345600086"
        },
        { 
            id: 2, 
            name: "Abrigo dama", 
            description: "Abrigo color beigh", 
            price: 15000, 
            imageUrl: "https://http2.mlstatic.com/D_NQ_NP_860702-CBT71844186113_092023-O.webp"
        },
        {   
            id: 3, 
            name: "Tacon", 
            description: "Tacones mujer, tono verde", 
            price: 20000, 
            imageUrl: "https://weide.cl/cdn/shop/products/P-GH52Z_verde-1.webp?v=1678250556&width=1500" 
        },
        {   
            id: 4, 
            name: "Mini-Falda", 
            description: "Falda corta, material 100% algodón", 
            price: 6500, 
            imageUrl: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCO/120471537_01/w=800,h=800,fit=pad" 
        },
        {   
            id: 5, 
            name: "Zapatillas", 
            description: "Zapatillas con plataforma", 
            price: 15000,
            imageUrl: "https://www.dimarsa.cl/media/catalog/product/m/a/marcasskechers73690-crl-rosado1jpeg_0_6.jpg"
        },
        {   
            id: 6, 
            name: "Conjunto dama",
            description: "Conjunto negro sexy",
            price: 11000,
            imageUrl: "https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/128835811_01/w=1500,h=1500,fit=pad" 
        },
    ];

    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Nuevo endpoint para agregar un producto
app.post('/api/products', (req, res) => {
    const newProduct = {
        id: Date.now(), // Genera un ID único
        ...req.body
    };

    // Aquí podrías agregar lógica para guardar el producto en una base de datos
    // Por ahora, simplemente lo devolveremos como respuesta
    res.status(201).json(newProduct);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});