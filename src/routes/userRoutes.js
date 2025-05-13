import express from 'express';
import { createAllUsers, deleteUsers, getAllUsers, getIdUser, login, registerUser, updateAllUsers,  } from '../controllers/userController.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema, loginSchema, updateUserSchema } from '../schemas/userSchemas.js';
import { authenticate } from '../middleware/authentication.js';

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getIdUser);
router.post("/criar",validate(createUserSchema) ,createAllUsers);
router.put("/:id", authenticate,validate(updateUserSchema) ,updateAllUsers)
router.delete("/:id", authenticate, deleteUsers);
router.post("/register", registerUser);
router.post('/login', validate(loginSchema), login)


export default router;