import db from '../models/index.js';
import *as bcrypt from "../libs/encrypt.pass.js";
import jwt from "jsonwebtoken";
import config from "../libs/config.js";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await db.models.User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear un usuario
export const createUser = async (req, res) => {
    console.log("personal", req.body);
    try {
        const { username, password } = req.body;
        const contra = await bcrypt.encryptPass(password);
        console.log(contra)
        const newUser = await db.models.User.create({ username, password: contra });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    console.log('User', req.body);
    const { username, password} = req.body;
    const verificacion = await db.models.User.findAll({
        where: {
            username: username,
            status: "Activo"
        }
    });
    console.log('Datos------', verificacion);
    if(verificacion.length <= 0){
        return res.status(400).json({mensaje: "Las credenciales son incorrectas"})
    }else{
        const isContra = await bcrypt.comparePassword(password, verificacion[0].password);
        if(isContra === true){
            const token = jwt.sign({id: verificacion[0].id}, config.SECRET, {
                expiresIn: 86400
            });
            return res.status(200).json({token, nombre: verificacion[0].username, id: verificacion[0].id})
        }else{
            return res.status(400).json({mensaje: "Las credenciales son incorrectas"})
        }
    }
}

export const buscarId = async (req, res) => {
    console.log("user", req.body);
    const {id}=req.body;
    const user = await db.models.User.findAll({
        where: {
            id: id
        }
    });
    console.log(user)
    const datos = {
        "username": user[0].username,
        "status": user[0].status
    }
    return res.status(200).json({mensaje: "reg per", res: datos})
}

export const obtenerId = async(req, res) => {
    const {username, password} = req.body;
    const verificacion = await db.models.User.findAll({
        where: {
            username: username,
            status: "Activo"
        }
    });
    console.log('Datos------', verificacion);
    if(verificacion.length <= 0){
        return res.status(400).json({mensaje: "Las credenciales son incorrectas"})
    }else{
        const isContra = await bcrypt.comparePassword(password, verificacion[0].password);
        if(isContra === true){
            return res.status(200).json({id: verificacion[0].id})
        }else{
            return res.status(400).json({mensaje: "Las credenciales son incorrectas"})
        }
    }
}

export const cambiarStatus = async(req, res) => {
    const {id} = req.body;
    const user = await db.models.User.findAll({
        where: {
            id: id
        }
    });
    const newStatus = user[0].status == "Activo" ? "Inactivo":"Activo"
    user[0].status = newStatus;
    const persona = await db.models.User.update({status: newStatus}, {
        where: {
            id: id
        }
    });
    console.log(persona)
    return res.status(200).json({mensaje: "se actualizaron los datos", res: user[0]});
}

export const eliminarUser = async(req, res) => {
    const {id} = req.body;
    const user = await db.models.User.destroy({
        where: {
            id: id
        }
    });
    return res.status(200).json({mensaje: "se eliminaron los datos", res: user});
}