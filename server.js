const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let documentText = "";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("load-document", documentText);

  socket.on("send-changes", (data) => {
    documentText = data;
    socket.broadcast.emit("receive-changes", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
