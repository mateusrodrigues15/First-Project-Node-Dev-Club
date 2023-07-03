/* --Querry params => meusite.com/users?nome=mateus&idade=23 filtros 
   --Route params => /users/2  Buscar, deletar ou atualizar algo especifico
   --Request Body => {"name": "mateus", "age": 23}

   -- GET => buscar informação no Back-end
   -- POST => Criar informação no Back-end
   --PUT / PATCH => Alterar/Atualizar informação no Back-end
   --DELETE => Deletar informação no Back-end

   --Middleware => INTERCEPTADOR => tem o poder de parar ou alterar dados de requisição
   */

const express = require('express')
const port = 3000
const uuid = require("uuid")
const app = express()
app.use(express.json())


const users = []

const check_user_id = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) { return response.status(404).json({ message: "User not found" }) }

    request.userIndex = index
    request.userId = id

    next()

}

app.get('/users',  (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', check_user_id,  (request, response) => {
    ""

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }


    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', check_user_id,  (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})



app.listen(port, () => {
    console.log(`😎 Server started on port ${port}`)
})




