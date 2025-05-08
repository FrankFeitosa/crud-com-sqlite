import express from 'express';
import { createAllUsers, deleteUsers, getAllUsers, getIdUser, updateAllUsers } from '../controllers/userController.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, updateUserSchema } from '../schemas/userSchemas.js';

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getIdUser);
router.post("/post",validate(createUserSchema) ,createAllUsers);
router.put("/u/:id",validate(updateUserSchema) ,updateAllUsers)
router.delete("/r/:id", deleteUsers);

export default router;