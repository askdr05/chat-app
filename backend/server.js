const app = require("./app")

const dotenv = require('dotenv')
const cloudinary = require('cloudinary')
const databaseConection = require('./config/dataBase')

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


dotenv.config({ path: "config/config.env" })


//connecting to database
databaseConection()

cloudinary.config({
    cloud_name: process.env.CLOUDINAY_NAME,
    api_key: process.env.CLOUDINAY_API_KEY,
    api_secret: process.env.CLOUDINAY_API_SECRET,
})


const server = app.listen(process.env.PORT, () => {
    console.log(`server working on ${process.env.port}`)
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

// const users = {}

io.on("connection", (socket) => {
    console.log("connected to socket.io")



    socket.on("setup", (userData) => {
        // console.log(userData._id)
        // users[socket.id] = userData
        // .emit("user-connected", users[socket.id])
        socket.join(userData)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)
        console.log(`join chat in ${room}`)
    })

    socket.on("typing", (room) => {
        socket.in(room).emit("isTyping")
        // console.log(`istyping in ${room}`)
    }
    );

    socket.on("stop typing", (room) => socket.in(room).emit("stop isTyping"));

    //sending message to others --->
    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        // console.log(newMessageRecieved.content)
        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.on("disconnect", () => {
        console.log(`disconnect`)

    })
})


// unhandeled promise rejection

process.on('unhandledRejection', (err) => {
    console.log(`error:${err.message}`)
    console.log('shutting down the server due to unhandeled promise rejection')

    server.close(() => {
        process.exit(1)
    })
})
