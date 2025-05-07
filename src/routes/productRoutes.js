import express from 'express'
import { createAllProducts, deleteProduct, getAllProducts, getIdProduct, updateIdProduct } from '../controllers/productController.js';

const router = express.Router()

router.post("/products", createAllProducts);
router.get("/products", getAllProducts);
router.get("/products/:id", getIdProduct);
router.put("/products/:id", updateIdProduct);
router.delete("/products/:id", deleteProduct);

export default router