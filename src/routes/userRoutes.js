import express from 'express';
import { getAllUsers, postUsers } from '../controllers/userController.js';

const router = express.Router();

router.get("/", getAllUsers);
router.post("/post", postUsers)

export default router;