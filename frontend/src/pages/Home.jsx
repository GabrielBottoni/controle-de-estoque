// src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch os produtos do backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter((product) => product.id !== id)); // Remove o produto da lista local
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Produtos</h2>
      <Link to="/add-product" className="btn btn-primary">Adicionar Produto</Link>
      <ul className="list-group mt-4">
        {products.map((product) => (
          <li key={product.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <span>{product.name}</span>
              <div>
                <Link to={`/edit-product/${product.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-danger btn-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
