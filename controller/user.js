const database = require('../model/database.json')
const fs = require('fs');

const saveToDB = (string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./model/database.json', string, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
const getUsers = (req, res) => {
    const users = database;
    res.status(200).json ({
         message: `All users found and the total is: ${users.length}`,
    data: users
    })
}

const createUser = async (req, res) => {
    const {name, gender, isMarried} = req.body;
    const user = {
        name,
        gender,
        isMarried,
        id: database.length + 1
    }
    
    database.push(user);

    await saveToDB(database)

    res.status(201).json({
        message: 'User created successfully',
        data: user
    })
}

module.exports = {
    getUsers,
    createUser
}