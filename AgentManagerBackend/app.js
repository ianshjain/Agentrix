const express = require('express');
const cors = require('cors');

const UserRouter = require('./routers/UserRouter');

const server = express();

server.use(cors());
server.use(express.json());

// routes
server.use("/users", UserRouter);

// start server
server.listen(7978, () => {
    console.log("Server Running : http://localhost:7978");
});