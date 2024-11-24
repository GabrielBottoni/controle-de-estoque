import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter produtos', error: err });
  }
};

export const addProduct = async (req, res) => {
  const { name, quantity, category } = req.body;
  const newProduct = new Product({ name, quantity, category });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar produto', error: err });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, quantity, category }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: err });
  }
};
