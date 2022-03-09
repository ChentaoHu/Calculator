const express = require('express')
const app =express()
const bcrypt =require('bcrypt')

app.use(express.json())

const users =[]

app.get('/users',(req,res) =>{
  res.json(users)
})

app.post('/users',async (req,res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = {id: Date.now().toString(),name:req.body.name, email: req.body.email,password: hashedPassword}
    users.push(user)
    res.status(201).send()
    res.redirect('/login')
  } catch{
    res.status(500).send()
  }
})

app.post('/users/login', async(req,res) =>{
  const user =users.find(user => user.name ===req.body.name)
  if (user ===null){
    return res.status(400).send('cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)){
      res.send('Success')
    }
    else{
      res.send('Wrong password')
    }
  } catch{
    res.status(500).send()
  }
})


app.listen(8080)