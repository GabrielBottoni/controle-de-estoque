// src/pages/EditProduct.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
  });
  const [error, setError] = useState('');
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch o produto para editar
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://controle-de-estoque-rust.vercel.app/api/products/${productId}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.category) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    setError('');

    try {
      const response = await fetch(`https://controle-de-estoque-rust.vercel.app/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/'); // Redireciona para a página principal
      } else {
        throw new Error('Erro ao atualizar produto');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Editar Produto</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Produto</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantidade</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="form-control"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoria</label>
          <select
            id="category"
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="acessorios">Acessórios</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditProduct;
