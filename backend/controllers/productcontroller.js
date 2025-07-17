


const product = require("../models/product");

// ✅ Fetch all products or filter by IDs (for wishlist support)
const getAllProducts = async (req, res) => {
  try {
    const { ids } = req.query;

    const response = await fetch('https://fakestoreapi.com/products');
    const allProducts = await response.json();

    // If ?ids=1,2,3 is provided, filter the products
    if (ids) {
      const idArray = ids.split(',').map(id => parseInt(id));
      const filtered = allProducts.filter(product => idArray.includes(product.id));
      return res.json(filtered);
    }

    res.json(allProducts);
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// ✅ Fetch single product by ID
const getAllProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Product not found' });
    }
    const product = await response.json();
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// ✅ Create new product (FakeStoreAPI won't save it but simulates)
const createProduct = async (req, res) => {
  const { title, price, description, category, image } = req.body;

  if (!title || !price || !description || !category || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const validatedProduct = new product({ title, price, description, category, image });
    await validatedProduct.validate();

    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify({ title, price, description, category, image }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// ✅ Update product (admin only, simulated)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// ✅ Delete product (admin only, simulated)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = {
  getAllProducts,
  getAllProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
