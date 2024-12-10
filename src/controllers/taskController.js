import db from '../models/index.js';

export const taskToken = async(req, res) => {
    const {id} = req.body;
    const tasks = await db.models.Task.findAll({
        where: {
            user_id: id
        }
    })
    return res.status(200).json({mensaje: "Lista de tareas", res: tasks});
}

export const taskCreate = async(req, res) => {
    const {name, id} = req.body;
    const task = await db.models.Task.create({name, user_id:id});
    return res.status(200).json({mensaje: "Rgistro correcto", res: task});
}

export const taskId = async(req, res) => {
    const {id} = req.body;
    const tasks = await db.models.Task.findAll({
        where: {
            id: id
        }
    })
    return res.status(200).json({mensaje: "se recuperaron los datos", res: tasks});
}

export const taskUpdate = async(req, res) => {
    const {name, id} = req.body;
    const task = await db.models.Task.update({name: name},{
        where: {
            id: id
        }
    });
    return res.status(200).json({mensaje: "se actualizaron los datos", res: task});
}

export const taskDone = async(req, res) => {
    const {id} = req.body;
    const task = await db.models.Task.findAll({
        where: {
            id: id
        }
    });
    const newDone = task[0].done == 0 ? 1:0
    task[0].status = newDone;
    const taskUp = await db.models.Task.update({done: newDone}, {
        where: {
            id: id
        }
    });
    return res.status(200).json({mensaje: "se actualizaron los datos", res: task});
}

export const taskDelete = async(req, res) => {
    const {id} = req.body;
    const task = await db.models.Task.destroy({
        where: {
            id: id
        }
    });
    return res.status(200).json({mensaje: "se eliminaron los datos", res: task});
}

export const taskUser = async(req, res) => {
    const {id} = req.body;
    const tasks = await db.models.User.findAll({
        where: {
            id: id
        },
        include:{
            model: db.models.Task,
            where: {
                user_id:id
            }
        }
    });
    return res.status(200).json({mensaje: "Lista de tareas segun usuario", res: tasks});
}