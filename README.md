# Workduck-Backend Assignment

You will have to build a system which recieves messages from Telegram (third party API) and sends it to all relevant users (collaboration) along with showing historic messages (database).

![download](https://user-images.githubusercontent.com/72180855/235340781-7e96eb85-f027-444d-8d60-f2cd2b6a856b.jpeg)

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

### Screenshot
![Screenshot from 2023-04-30 14-42-28](https://user-images.githubusercontent.com/72180855/235346420-5c10e6f8-9992-493b-9663-1f8703c00191.png)

### Tech Stack Used

**Client**: EJS Layouts to display the incoming broadcast messeges from server in UI
**Server**: NodeJS, ExpressJS, MongoDB, Redis, Socket.io




### Acknowledgement

Lastly, thank you so much for providing this wonderful assignment learned a lot of things starting from Redis queues to sockets to building bots and broadcasting them live it was really challenging but was very fun to do which made me work continuously and completing the assignment in span of 1.5 day, looking forward to it now



