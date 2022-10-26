const http = require("http");
const appServer = require("./app");
const PORT = process.env.PORT || 4000;

const server = http.createServer(appServer);
const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("the message is ready", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (chat) => {
    socket.join(chat);
    console.log("user joined chat ", chat);
  });

  socket.on("new message", (newMessage) => {
    var chat = newMessage.chat;

    if (!chat.users) return console.log("chat.users is not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessage.sender._id) return;

      socket.in(user._id).emit("message received", newMessage);
    });
  });
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
