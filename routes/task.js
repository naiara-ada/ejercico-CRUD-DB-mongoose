const express = require('express');
const router = express.Router();
const Task = require('../models/Task.js');


//para crear una tarea
router.post('/create', async(req, res)=>{
    try {
        const task = await Task.create(req.body);
        //res.status(201).send(task)
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'error de creación'})
    }
});


//para traer todas las tareas
router.get('/', async(req, res) =>{
    try {
        const tasks = await Task.find();
        res.json(tasks)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({mensaje: 'error busqueda de tareas'})
    }
});

//buscar tarea por id
router.get('/id/:_id', async (req, res) =>{
    try {
        const idTask = req.params._id
        const task = await Task.findById(idTask);
        if (!task){
            throw new Error('Tarea no encontrada')
        }
        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(404).send({mensaje: "error en la busqueda por id"})
    }
});

//marcar una tarea como completada
router.put('/markAsCompleted/:_id', async(req, res) =>{
    try {
        const idTask = req.params._id;
        const task = await Task.findByIdAndUpdate(idTask, {completed: true}, {new: true})
        if (!task){
            throw new Error('Tarea no encontrada por ID para marcar')
        }
        res.json(task)
        
    } catch (error) {
        console.error(error);
        res.status(404).json({mensaje: 'error markCompleted by id'});        
    }
})

//actualizar una tarea solo titulo
router.put('/id/:_id', async(req, res) =>{
    try {
        const idTask = req.params._id;
        const {title} = req.body;
        const task = await Task.findByIdAndUpdate(idTask, {title}, {new:true});
        if(!task){
            throw new Error('Tarea no encontrada por ID para actualizar')
        }
        res.json(task);
        
    } catch (error) {
        console.error(error)
        res.status(404).json({mensaje: 'error update by id'});
    }
})

router.delete('/id/:_id', async(req, res) =>{
    try {
        const idTask = req.params._id;
        const task = await Task.findByIdAndDelete(idTask);
        if (!task){
            throw new Error('Tarea no encontrada para eliminar')
        }
        res.json({mensaje: 'Tarea eliminida'});        
    } catch (error) {
        console.error(error)
        res.status(404).json({mensaje: 'error delete by id'});
    }
})


module.exports = router;