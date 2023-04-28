require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}.`);
    await init();
})