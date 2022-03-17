const express = require('express')
const app =express()
const bcrypt =require('bcrypt')
const cors = require('cors')


app.use(cors())
app.use(express.json())


const users =[]

app.get('/users',(req,res) =>{
  res.json(users)
})

app.get('/login', (req,res) =>{

})

app.post('/login', async(req,res) =>{
  const user =users.find(user => user.name == req.body.name)
  if (user == null){
    return res.status(400).send('cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)){
      res.status(200).send({id: user.id})
    }
    else{
      res.send('Wrong password')
    }
  } catch{
    res.status(500).send()
  }
})

app.get('/register', (req,res) =>{
  
})

app.post('/register', async (req, res) => {
  try {
    const pass = req.body.password.toString();
    const name = req.body.name.toString();
    const hashedPassword = await bcrypt.hash(pass, 10)
    console.log(pass)
    console.log(name)
    // const user =users.find(user => user.name == req.body.name)
    // if (user !== null){
    //   return res.status(401).send('Users already exists')
    // }
    users.push({
      id : users.length,
      name: name,
      password: hashedPassword,
      todos :[]
    })
    console.log(hashedPassword)
    console.log(res)
    res.status(200).send()
  } catch(error) {
    console.log(error)
    res.status(400).send()
  }
})

app.get('/todos/:userid',(req,res) =>{
  const user = users.find(user => user.id == req.params.userid)
    if (user == null){
      return res.status(404).send('Users does not exists')
    }
    return res.status(200).send(user.todos)
})

app.post('/todos/:userid',(req,res) =>{
  const user = users.find(user => user.id == req.params.userid)
    if (user == null){
      return res.status(404).send('Users does not exists')
    }
    user.todos.push(req.body.todo)
    return res.status(200).send(user.todos)
})

app.delete('/todos/:userid/:todoid',(req,res) =>{
  const user = users.find(user => user.id == req.params.userid)
    if (user == null){
      return res.status(404).send('Users does not exists')
    }
    user.todos.pop(req.params.todoid)
    return res.status(200).send(user.todos)
})


app.listen(3001)