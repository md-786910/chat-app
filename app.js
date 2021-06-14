const express = require("express");
const formatMessages = require("./utils/messages")

const { userJoin, getCurrentUser, userLeave, getRoomUser } = require("./utils/users")

const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const PORT = 5000;
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});
// const io = socketIo(server);
// static folder
app.use('/static', express.static(path.join(__dirname, "static")));

const botName = "chatCord Bot"
// when client connect
// console.log(formatMessages())

io.on("connection", socket => {
    // console.log("new user conn")

    socket.on("joinChat", ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // listen for chat message

        socket.emit("message", formatMessages(username, "welcome to chatcord!"));

        // brodcast when user conn
        socket.broadcast.to(user.room).emit("message", formatMessages(username, `${username} has joined the chat`)); // istead use io.emit()

        // send room and username 

        io.to(user.room).emit("roomUser", {
            room: user.room,
            users: getRoomUser(user.room)
        })

    })

    // chat messsage
    socket.on("chatMessage", msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessages(user.username, msg));
    })
    // when discoon

    socket.on("disconnect", () => {
        const user = userLeave(socket.id)
        if (user) {
            io.to(user.room).emit("message", formatMessages(user.username, `${user.username} has left the chat`));

        }
        // send room and username 
        io.to(user.room).emit("roomUser", {
            room: user.room,
            users: getRoomUser(user.room)
        })


    })
})
// console.log("dshd", TimeMoment)

server.listen(PORT, () => {
    console.log("app is running at port ", PORT)
})
