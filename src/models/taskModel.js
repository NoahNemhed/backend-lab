// model/taskModel.js



const db = require('../services/databaseService')

let tasks = [
  { id: 1, title: "task1", description: "This is task 1", status: "todo", priority: 1 },
  { id: 2, title: "task2", description: "This is task 2", status: "doing", priority: 2 },
  { id: 3, title: "task3", description: "This is task 3", status: "done", priority: 3 },
];

// get all tasks
async function getAllTasks(){
    return await db.query('SELECT * FROM tasks');
}


async function addTask(body){
    const result = await db.query(
        `
        INSERT INTO tasks (title, description, status, priority)
        VALUES (?, ?, ?, ?)
        `,
        [
            body.title,
            body.description ?? "",
            body.status ?? "todo",
            body.priority ?? 2,
        ]
    );

    const id = Number(result.insertId);

    return { id, ...body };

}

// get task by id
async function getTaskById(id){
    return await db.query(`SELECT * FROM tasks WHERE id=${id}`)
}

async function updateTaskById(id, data){
    // check if task exists
    const existing = await getTaskById(id);
    if (!existing) return null;

    // merge old + new data
    const updatedTask = {
        title: data.title ?? existing.title,
        description: data.description ?? existing.description,
        status: data.status ?? existing.status,
        priority: data.priority ?? existing.priority,
    };

    // update data in actual db
    await db.query(
        `
        UPDATE tasks
        SET title = ?, description = ?,  status = ?, priority = ?
        WHERE id = ?
        `,
        [
        updatedTask.title, updatedTask.description, updatedTask.status, updatedTask.priority, id
        ]
    )

    

    return await getTaskById(id);

}


async function deleteTaskById(id){
    const existing = await getTaskById(id)
    if(!existing) return null;

    const result = await db.query(
        `DELETE FROM tasks WHERE id = ?`, [id]
    )

    console.log(result)

    return (result.affectedRows > 0)
}




module.exports = {getAllTasks, getTaskById, updateTaskById, deleteTaskById, addTask}