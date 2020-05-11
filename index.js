const express = require('express')

const server = express()

server.use(express.json())

const users = ['jao', 'bb', 'leo']

server.use((req, res, next) => {
    console.time('Request')
    console.log(`Method ${req.method}; URL: ${req.url}`)

    next()

    console.timeEnd('Request')
})

//FUNÇÃO CHECK USER

function checkUsersExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({ error : 'Invalid user name'})
    }

    return next()

}

//FUNÇÃO CHECK INDEX

function checkUserInArray(req, res, next){
    const user = users[req.params.index]
    if(!user){
        return res.status(400).json({ error : 'User does not exist'})
    }

    req.user = user

    return next()
}

//READ USERS

server.get('/users', (req, res)=>{
    return res.json(users)
})

server.get('/users/:index', checkUserInArray,  (req, res) =>{

    const { index } = req.params

    return res.json(req.user)
})

//CREATE USERS

server.post('/users', checkUsersExists, (req, res) => {

    const { name } = req.body
    users.push(name)
    return res.json(users)
})

//EDIT USERS

server.put('/users/:index', checkUserInArray, checkUsersExists, (req, res) =>{
    const { index} = req.params
    const { name } = req.body
    users[index] = name

    return res.json(users)
} )

//DELETEE USERS

server.delete('/users/:index', (req, res) =>{

    const { index} = req.params
    users.splice(index, 1)
    return res.send();

})

server.listen(3000)