import {PrismaClient} from '@prisma/client';
import { comparePassword, generateToken, hashPassword } from '../utils/auth.js';
const prisma = new PrismaClient();


export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "Usuários não encontrado", erro: error.message})
    }
};

export const getIdUser = async (req, res) => {
    const id = req.params.id
    try {
        const userId = await prisma.user.findUnique({
            where:{ id: Number(id) }
        })
        res.status(200).json(userId)
    } catch (error) {
        console.error({message: "Id não encontrado", erro: error.message});
    }
}

export const createAllUsers = async (req, res) => {
   try {
    const {name, email, password} = req.body

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
    res.status(201).json(newUser);
   } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao criar novo usuário", erro: error.message});
   }
};

export const updateAllUsers = async (req, res) => {
    const id = req.params.id
    const {name, email, password} = req.body
    try {
        const updatedUser = await prisma.user.update({
            where: {id: parseInt(id)},
            data: {name,  email, password}
        })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({
            message: "erro ao atualizar o usuário",
            erro: error.message
        })
    }
}

export const deleteUsers = async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await prisma.user.delete({
            where: {id: Number(id) }
        });
        res.status(204).send()
    } catch (error) {
        res.status(404).json({message: "Usuário não encontrado.", erro: error.message})
    }
};

export const registerUser = async (req, res) => {

    const {name, email, password} = req.body

    try {
        // Criar a senha do usuário hasheada
        const hashedPassword = await hashPassword(password)

        //Cria usuário no banco de dados
        const newRegisteredUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        })

        //Gerar um token JWT
        const token = generateToken(newRegisteredUser)

        //Manda como resposta infos do usuário criado e o token de acesso
        res.status(201).json({
            name: newRegisteredUser.name,
            email: newRegisteredUser.email,
            token: token
        })
    
    } catch (error) {
        res.status(400).json({
            erro: "Erro ao criar o usuário!",
            detalhes: error.message
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        //01. Buscar o usuário pelo email
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if(!user){
            return res.status(401).json({
                mensagem: 'Credenciais inválidas!'
            })
        }
        //02. comparar a senha fornecida com o hash armazenado
        const passwordMatch = await comparePassword( password, user.password )
        if(!passwordMatch){
            return res.status(401).json({
                mensagem: 'Credenciais inválidas!'
            })
        }
        //03. gerar o token jwt
        const token = generateToken(user)
        //04. Enviar como resposta o user e o token
        res.json({
            usuario: {name: user.name, email: user.email},
            token
        }) 

    } catch (error) {
        res.status(500).json({
            mensagem: 'Erro ao fazer login',
            erro: error.message
        })
    }
}
