require('dotenv').config()
const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const axios = require("axios");
const redis = require("redis");
const http = require("http");
const socketIo = require("socket.io");
const redisClient = redis.createClient();
const connectDB = require("./config/db");
const Chat = require("./models/Chat");

app.set("view engine", "ejs");
connectDB();
const server = http.createServer(app);
const io = socketIo(server).listen(server);

const { TOKEN, SERVER_URL, REDIS_HOST, REDIS_PORT } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.post(URI, async (req, res) => {
    console.log(req.body)
    const chatID = req.body.message.chat.id
    const message = req.body.message.text
    redisClient.on('connect', () => {
        console.log('Redis client connected');
        redisClient.lpush('chats', message, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`Message: ${message} added to queue. Result: ${result}`);
            }
        });
    })
    const chat = new Chat({
        chat: message
    })
    await chat.save()
    io.emit("message", message)
    return res.send("Message added to queue.")
})

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
    const chats = await Chat.find();
    res.render("index", { chats });
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}.`);
    await init();
});