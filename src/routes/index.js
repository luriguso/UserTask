import express from 'express';
import *as userController from '../controllers/userController.js';
import *as taskController from '../controllers/taskController.js';
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

// Rutas de usuario
router.get('/users', userController.getUsers); // Obtener todos los usuarios
router.post('/users', userController.createUser); // Crear un usuario
router.post('/login', userController.loginUser);  //login
router.post('/users/:id', userController.buscarId);
router.put('/users/:id', userController.obtenerId);
router.patch('/users/:id', userController.cambiarStatus);
router.delete('/users/:id', userController.eliminarUser);

//rutas task
router.get('/tasks', taskController.taskToken);
router.post('/tasks', taskController.taskCreate);
router.get('/tasks/:id', taskController.taskId);
router.put('/tasks/:id', taskController.taskUpdate);
router.patch('/tasks/:id', taskController.taskDone);
router.delete('/tasks/:id', taskController.taskDelete);
router.get('/users/:id/tasks', taskController.taskUser);
export default router;
