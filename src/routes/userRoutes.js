import express from 'express';
import { createAllUsers, deleteUsers, getAllUsers, updateAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get("/", getAllUsers);
router.post("/post", createAllUsers);
router.put("/u/:id", updateAllUsers)
router.delete("/r/:id", deleteUsers);

export default router;