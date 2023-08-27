const express = require('express')
const app = express()
const errorMiddleWare = require('./middleware/error')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const dotenv = require('dotenv')

//config

dotenv.config({path:"config/config.env"})

app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(upload.array())





const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute')
const messageRoute = require("./routes/messageRoute")
const notificationRoute = require("./routes/notificationRoute")



app.use('/api/v1',userRoute)
app.use('/api/v1',chatRoute)
app.use('/api/v1',messageRoute)
app.use('/api/v1',notificationRoute)

app.use(errorMiddleWare)

module.exports = app