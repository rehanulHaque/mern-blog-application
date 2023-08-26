require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const blogRouter = require('./router/blog')
const userRouter = require('./router/user')
app.use('/blog', blogRouter)
app.use('/user', userRouter)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port, () => console.log(`App listening on port ${port}!`))
    console.log('Db Connected')
}).catch((error)=> console.log(error))