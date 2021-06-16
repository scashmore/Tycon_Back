const express = require('express');
const app = express()
const dotenv = require('dotenv')
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require("path");
var cors = require("cors");
const options = { cors: { origin: "*" } };
const Socketio = require('socket.io')(http, options);
const db = require("./db")
const restaurantRouter = require("./routes/reataurant-router");

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))

// Socketio.on("connection", (socket) => {
    
// });

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello Restaurant Tycon!')
});

app.use('/api', restaurantRouter)

dotenv.config();

const PORT = process.env.PORT || 3001

http.listen(PORT, ()=> {
    console.log('listening on PORT')
});