const  product = require("../models/product");



const getAllProducts = async(req , res) =>{
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const products = await response.json();
        res.json(products)
    } catch (error) {
        res.status(500).json({ message : 'error fetching product'})
    }
}
//  single product
const getAllProductById = async (req, res) => {
  const { id } = req.params;
  try {
    // Use backticks for string interpolation!
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Product not found' });
    }
    const product = await response.json();
    res.json({ product });  // wrap in { product } for consistency
  } catch (error) {
    res.status(500).json({ message: 'error fetching product' });
  }
};
//  create new product
const createProduct = async (req,res) =>{
    const { title , price  , description  , category , image } = req.body

    if (!title || !price || !description || !category || !image) {
       return res.status(400).json({message : 'all fields are required'})
    }

    try {
        const vaildatedProduct = new product({ title , price , description , category , image });
        await vaildatedProduct.validate();

        const response = await fetch('https://fakestoreapi.com/products',{
           method : 'post',
           body :JSON.stringify({ title , price , description , category , image}),  
           headers : {'content-type' : 'application/json'}
        })
    } catch (error) {
        res.status(500).json({ messgae : 'error creating product', error :error.message})
    }
}


//  udate admin only
const updateProduct = async (req , res) =>{
    const {id} =req.params;
    const updateProduct = req.body;

    try {
        const response = await fetch('https://fakestoreapi.com/products/${id}', {
          method : 'PUT',
          body : JSON.stringify(updateData),
          headers : { 'content-type' : 'application/json'}  
        })

        const result = await response.json();
        res.json(result)
    } catch (error) {
        res.status(500).json({message : 'error updating product'})
    }
}

//  delete product admin only

const deleteProduct = async (req, res) =>{
    const {id} = req.params;

    try {
        const response = await fetch('`https://fakestoreapi.com/products/${id}' ,{
            method : 'DELETE' ,
        })
        const result = await response.json();
        res.json(result);
    } catch (error) {
        res.status(500).json({message : 'error deleting product'})
    }
}

module.exports = {getAllProducts , getAllProductById , createProduct , deleteProduct ,updateProduct}