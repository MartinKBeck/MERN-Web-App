const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const invRoutes = express.Router();
const MongoClient = require('mongodb').MongoClient;
const PORT = 4000;

var credentials = require('./credentials.json');

app.use(cors());
app.use(bodyParser.json());

invRoutes.route('/').get

app.use('/inv', invRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT)
})