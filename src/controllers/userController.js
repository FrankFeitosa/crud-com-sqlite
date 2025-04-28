export const getAllUsers = (req, res) => {
    res.status(200).json({message: "Rota GET user funcionando"})
};

export const postUsers = (req, res) => {
    const {nome, email} = req.body;

    const novoUsuario = {
        nome,
        email
    }
    res.status(201).json(novoUsuario)
}

