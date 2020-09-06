const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, function() {
    console.log("Server is running on Port: " + port)
})