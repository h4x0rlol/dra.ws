const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;
app.use(cors());

const main = () => {
  try {
    app.listen(PORT, () => {
      console.log("Listening Port:" + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

app.ws("/", (ws, req) => {
  console.log("connected");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        broadcastConnection(ws, msg);
        break;
      default:
        break;
    }
  });
});

const connectionHandler = (ws, msg) => {
  ws.id = msg?.id;

  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};

main();
