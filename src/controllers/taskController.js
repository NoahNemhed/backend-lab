// controller/taskController.js

//importera taskModel
const taskModel = require('../models/taskModel');


// method to validate a task isUpdate == PUT !isUpdate == POST
function validateTask(body, isUpdate){
    const allowedStatus = ["todo", "doing", "done"];

    // if post request
    if(!isUpdate){
        // title checkers
        if(!body.title || typeof body.title != "string"){
            return { ok: false, error: "Title must be a string"}
        }
        
        // description checkers
        if(!body.description || typeof body.description != "string"){
            return { ok: false, error: "description must be a string"}
        }

        // status checkers
        if(!body.status || typeof body.status != "string"){
            return { ok: false, error: "Status must be a string"}
        }

        if(body.status){
            if(!allowedStatus.includes(body.status)){
                return { ok: false, error: "Status must be either: todo, doing or done"}
            }
        }

        // priority checkers
        if(!body.priority || typeof body.priority != 'number'){
            return { ok: false, error: "Priority must be a number"}
        }

        if(body.priority){
            if(body.priority < 1 || body.priority > 3){
                return { ok: false, error: "Priority must be inbetween 1-3"}
            }
        }

        return { ok: true }
    }

    // if put request
    if(isUpdate){

        // title checker
        if(body.title != undefined){
            if(typeof body.title != "string"){
                return { ok: false, error: "Title must be a string"}
            }
        }

        // description checker
        if(body.description != undefined){
            if(typeof body.description != "string"){
                return { ok: false, error: "Description must be a string"}
            }
        }

        // priority checker
        if(body.priority != undefined){
            if(typeof body.priority != "number"){
                return { ok: false, error: "Priority must be a number"}
            }

            if(body.priority < 1 || body.priority > 3){
                return { ok: false, error: "Priority must be a number between 1-3"}
            }
        }

        // status checker
        if(body.status != undefined){
            if(typeof body.status != "string"){
                return { ok: false, error: "Status must be a string"}
            }

            if(!allowedStatus.includes(body.status)){
                return { ok: false, error: "Status must be either: todo, doing or done"}
            }
        }
        return { ok: true }
    }

}

exports.getAllTasks = async (req,res) => {
    try {
        const tasks = await taskModel.getAllTasks()
        res.status(200).json(tasks);
    }catch(err){
        res.status(404).json({message: 'Error fetching tasks'})
    }

}


exports.getTaskById = async (req,res) => {
    const id = Number(req.params.id);
    const task = await taskModel.getTaskById(id)


    if (task == "") {
        return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task)
}


exports.addTask = async (req,res) => {

    const validation = validateTask(req.body, false)

    if(!validation.ok){
        return res.status(400).json({error: validation.error})
    }
    
    const task = await taskModel.addTask(req.body)

    res.status(201).json(task);

}

exports.updateTaskById = async (req,res) => {

    const validation = validateTask(req.body, true)

    if(!validation.ok){
        return res.status(400).json({error: validation.error})
    }

    const id = Number(req.params.id);

    const updatedTask = await taskModel.updateTaskById(id, req.body)

    if(!updatedTask){
        return res.status(404).json({error: "Task not found"})
    }

    res.json(updatedTask)
}


exports.deleteTaskById = async (req, res) => {
    const id = Number(req.params.id);
    const deleted = await taskModel.deleteTaskById(id);

    if (!deleted) return res.status(404).json({ error: "Task not found" });

    res.sendStatus(204);

}

