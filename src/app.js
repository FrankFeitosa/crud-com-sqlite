import express from 'express';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
const app = express();

//Permite que o express entenda JSON no corpo da requisição
app.use(express.json())

//Define o endpoint (prefixo) /user para as rotas de usuário
app.use("/user", userRoutes);

//Define o endpoint /product para as rotas dos produtos
app.use("/product", productRoutes)



export default app;
