const express = require("express");
const { getAllProducts, getAllProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productcontroller");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");


const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id',getAllProductById)

router.post('/',authenticate,authorizeAdmin, createProduct)
router.put('/:id' ,authenticate,authorizeAdmin, updateProduct)
router.delete('/:id' ,authenticate, authorizeAdmin,  deleteProduct)

module.exports = router