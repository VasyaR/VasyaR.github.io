const requestHandler = require("./request-handler.js");
const express = require("express");
const cors = require("cors-express");
const { createServer } = require("http");
const { db } = require("./db");
const router = require("./request-handler.js");

const app = express();
const options = { origin: "*", methods: ["GET", "POST", "DELETE", "PUT"] };
app.use(cors(options));
const server = createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

app.use(express.json());

app.use("/", router);

io.on("connection", (socket) => {
  socket.on("messages", (d) => {
    io.sockets.emit("messages", d);
  });
  socket.on("update-message", (d) => {
    io.sockets.emit("update-message", d);
  });
  socket.on("delete-message", (d) => {
    console.log(d);
    io.sockets.emit("delete-message", d);
  });
});

server.listen(3000, () => console.log("Server started on port 3000"));
