const db = require('../services/databaseService')

// returns all users in database
async function getAllUsers(){
    return await db.query('SELECT username, email FROM users')
}

// returns user by id
async function getUserById(id){
    return await db.query(`SELECT username, email FROM users WHERE id = ${id}`)
}


// create an user
async function createUser(body){
    let pw = '$2b$10$wH8Q0sZc8v6sE3rG3F1Y7u8TgFzV9p3bK7OeHcM3q7F2H4qXzYy1K'

    const result = await db.query(`INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`, [body.username, body.email, pw])

    const id = Number(result.insertId)

    return {id, ...body}
}










module.exports = {getAllUsers, getUserById, createUser}