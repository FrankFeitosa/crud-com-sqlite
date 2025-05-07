import { PrismaClient } from "@prisma/client";
import { createProductSchema } from "../schemas/productSchemas.js";

const prisma = new PrismaClient();

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: "Produtos não encontrado", erro: error.message})
    }
};

export const getIdProduct = async (req, res) => {
    const id = req.params.id
    try {
        const productId = await prisma.product.findUnique({
            where:{ id: Number(id) }
        })
        res.status(200).json(productId)
    } catch (error) {
        console.error({message: "Id do produto não encontrado", erro: error.message});
    }
}

export const createAllProducts = async (req, res) => {
    const parseResult = createProductSchema.safeParse(req.body)
    if(!parseResult.success){
        return res.status(400).json({message: "Erro de validação", erros: parseResult.error.format()})
    }
    const {name, description, price, stock} = parseResult.data
   try {

    const newProduct = await prisma.product.create({
        data: {
            name,
            description: description ?? "",
            price,
            stock,
            createdAt: new Date() 
        }
    })
    res.status(201).json(newProduct);
   } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto", erro: error.message});
   }
};

export const updateIdProduct = async (req, res) => {
    const id = req.params.id
    const {name,description,price, stock} = req.body 
    try {
        const updatedProduct = await prisma.product.update({
            where: {id: parseInt(id)},
            data: {name,description,price, stock}
        })
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(400).json({
            message: "erro ao atualizar o produto",
            erro: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const deletedProduct = await prisma.product.delete({
            where: {id: Number(id) }
        });
        res.status(204).send()
    } catch (error) {
        res.status(404).json({message: "Produto não encontrado.", erro: error.message})
    }
};
