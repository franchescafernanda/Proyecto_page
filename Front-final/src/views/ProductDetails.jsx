import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../config/configAxios';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/productos/${id}`); //corregir porque no me esta funcionando
        console.log('Product details:', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="imgDetails">
      <img src={product.image_url} alt={product.nombre} />
      <div className='description'>
      <h2>{product.nombre}</h2>
      <p>Descripción: {product.descripcion}</p>
      <p>Precio: ${product.precio}</p>
      </div>      
    </div>
  );
};

export default ProductDetails;
