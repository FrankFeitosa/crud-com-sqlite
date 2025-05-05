import express from 'express';
import { createAllUsers, deleteUsers, getAllUsers, getIdUsers, updateAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getIdUsers);
router.post("/post", createAllUsers);
router.put("/u/:id", updateAllUsers)
router.delete("/r/:id", deleteUsers);

export default router;