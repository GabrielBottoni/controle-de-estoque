import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL)
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos', error);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - {product.quantity} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
