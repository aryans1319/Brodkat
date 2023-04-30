# Workduck-Backend Assignment

You will have to build a system which recieves messages from Telegram (third party API) and sends it to all relevant users (collaboration) along with showing historic messages (database).

![Logo](data:image/jpeg;base64,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)


### Breakdown of the problem statement from my end

- Creating a bot on Telegram
- Creating a server and webhook to receive and extract data from telegram            messages(**only text** as mentioned in the assignment)
- After extracting the text content once we receive the message we need to add it to a queue [**Using Redis as the queue to store messages here**]
- Broadcast the message to all active clients using web-sockets
- After that we need to setup the database to store all historic message
- Load previous messages when client connect to server and maintain a continuous connection between them using sockets to listen to new message and update UI accordingly

### Folder Structure
    - config
        - db.js
        - redis.js
    - constants
        - index.js
    - models
        - Chat.js 
    - views
        - index.ejs
    - index.js [ root directory ]    
For the best practices we maintain a MVC monolith architecture or microservice architecture of code but here since we have a single contoller and not multiple services, I have used a basic mvc architecture to keep it simple



### Requirements [Features] given in assignment and what I built

| Requirements | Build |
| --- | --- |
| Create your own bot on telegram | `Done` | 
| Create a server which can recieve the telegram messages | `Done` |
| The content of the message is extracted and sent to a queue | `Done` |
| Adding content of queue to database  | `Done` |
| Broadcasting it to all active clients  | `Done` |
| When the client connects to the server load all previous messages | `Done` |
| Connection is maintained to get continuous updates from every message| `Done` |

### Some Important Implementation

#### Function used to set up a webhook URL to receive messages from Telegram.
```
const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};
```

#### Function for sending all the previous messages to the client on connection
```
io.on("connection", async (socket) => {
  const chats = await Chat.find();
  socket.emit("messageList", chats);
});
```
#### Function receives a new message from Telegram, adds it to the Redis queue, saves it to the MongoDB database, and broadcasts it to all the connected clients.
```
app.post(URI, async (req, res) => {
  console.log(req.body);
  const message = req.body.message.text;

  redisClient.on("connect", () => {
    console.log("Redis client connected");
    redisClient.lPush("chats", message, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Message: ${message} added to queue. Result: ${result}`);
      }
    });
  });

  const chat = new Chat({
    chat: message,
  });

  await chat.save();

  io.emit("message", message);

  res.send("Message added to queue.");
});
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/aryans1319/workduck-backend.git
```

Go to the project directory

```bash
  cd workduck-backend
```

Install dependencies

```bash
  npm install
```

Start the ngrok server

```bash
  ngrok http 5000
```
Start the redis server [Assuming you have a redis server setup in local] and check status if it's running [Linux]

```bash
  sudo systemctl status redis
```
Start the localhost server

```bash
  npm run dev
```
As soon as you start move to localhost:5000 in your browser visit the bot named **@Workduck_Aryan_Bot** on Telegram click on start and start writing messages and you can see then broadcasting live on the server and working with multiple client devices at same time


### Tech Stack Used

**Client**: EJS Layouts to display the incoming broadcast messeges from server in UI
**Server**: NodeJS, ExpressJS, MongoDB, Redis, Socket.io




### Acknowledgement

Lastly, thank you so much for providing this wonderful assignment learned a lot of things starting from Redis queues to sockets to building bots and broadcasting them live it was really challenging but was very fun to do which made me work continuously and completing the assignment in span of 1.5 day, looking forward to it now



