
const userModel = require('../models/userModel')



exports.getAllUsers = async (req,res) => {
    try {
        const users = await userModel.getAllUsers()
        res.status(200).json(users);
    }catch(err){
        res.status(404).json({message: 'Error fetching users'})
    }
}


exports.getUserById = async (req,res) => {
    const id = Number(req.params.id);
    const user = await userModel.getUserById(id)

    if(user == ""){
        res.status(404).json({message: 'User not found'})
    }

    res.status(200).json(user)


}

exports.createUser = async (req,res) => {
    const userDetails = req.body
    
    if(!validateUserData(userDetails)) return res.status(404).json({message: "Invalid user details"})

    const result = await userModel.createUser(userDetails)

    res.status(200).json({message: 'Success', data: result})
}


function validateUserData(body){
    if(body.username == "") return false;

    if(body.email == "") return false;

    if(!body.email.includes("@")) return false;


    return true
}