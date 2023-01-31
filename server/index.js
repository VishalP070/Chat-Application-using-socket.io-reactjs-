const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors")
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
        //What is origin ? Its bascially tell , which server will call to the Socket Io Server.

    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {

    socket.to(data.room).emit("receive_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(8082, () => {
  console.log("SERVER RUNNING 8082");
});