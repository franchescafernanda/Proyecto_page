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
            name: "Cama para perro", 
            description: "Cama acolchonada, 100% algodón", 
            price: 12000, 
            imageUrl: "https://dojiw2m9tvv09.cloudfront.net/11787/product/dogitcamarectangular7043.jpg"
        },
        { 
            id: 2, 
            name: "Juguete para gato", 
            description: "Juguete interactivo con plumas", 
            price: 8000, 
            imageUrl: "https://ss345.liverpool.com.mx/xl/1103149122.jpg"
        },
        {   
            id: 3, 
            name: "Juguete", 
            description: "Juguete para perro", 
            price: 3500, 
            imageUrl: "https://space-theprofit.nyc3.cdn.digitaloceanspaces.com/public/Products/juguete-para-perros-forma-de-hueso_6579285a435f1.webp" 
        },
        {   
            id: 4, 
            name: "Rascador", 
            description: "Juguete para gato", 
            price: 10000, 
            imageUrl: "https://http2.mlstatic.com/D_NQ_NP_896438-MLU76434050926_052024-O.webp" 
        },
        {   
            id: 5, 
            name: "Peinetas", 
            description: "Juguete para perro", 
            price: 5000, 
            imageUrl: "https://space-theprofit.nyc3.cdn.digitaloceanspaces.com/public/Products/pack-de-accesorios-de-aseo-para-mascotas_6581a594360b5.webp"
        },
        {   
            id: 6, 
            name: "Arnes para conejo", 
            description: "Accesorios para conejos", 
            price: 20000, 
            imageUrl: "https://faunasalud.cl/wp-content/uploads/2022/11/137-0103.jpg" 
        },
    ]);
});

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const products = [
        { 
            id: 1, 
            name: "Cama para perro", 
            description: "Cama acolchonada, 100% algodón", 
            price: 12000, 
            imageUrl: "https://dojiw2m9tvv09.cloudfront.net/11787/product/dogitcamarectangular7043.jpg"
        },
        { 
            id: 2, 
            name: "Juguete para gato", 
            description: "Juguete interactivo con plumas", 
            price: 8000, 
            imageUrl: "https://puppieshouse.cl/1072-large_default/juguete-para-gatos-con-pluma-y-pelota.jpg"
        },
        {   
            id: 3, 
            name: "Juguete", 
            description: "Juguete para perro", 
            price: 3500, 
            imageUrl: "https://space-theprofit.nyc3.cdn.digitaloceanspaces.com/public/Products/juguete-para-perros-forma-de-hueso_6579285a435f1.webp" 
        },
        {   
            id: 4, 
            name: "Rascador", 
            description: "Juguete para gato", 
            price: 10000, 
            imageUrl: "https://http2.mlstatic.com/D_NQ_NP_896438-MLU76434050926_052024-O.webp" 
        },
        {   
            id: 5, 
            name: "Peinetas", 
            description: "Juguete para perro", 
            price: 5000, 
            imageUrl: "https://space-theprofit.nyc3.cdn.digitaloceanspaces.com/public/Products/pack-de-accesorios-de-aseo-para-mascotas_6581a594360b5.webp"
        },
        {   
            id: 6, 
            name: "Arnes para conejo", 
            description: "Accesorios para conejos", 
            price: 20000, 
            imageUrl: "https://faunasalud.cl/wp-content/uploads/2022/11/137-0103.jpg" 
        },
    ];

    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});