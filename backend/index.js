const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;
const CLIENTS = [];
let LOBBIES = [];
app.use(cors());
app.use(express.json());

const main = () => {
  try {
    app.listen(PORT, () => {
      console.log("Listening Port:" + PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

app.get("/health", async (req, res) => {
  try {
    return res.status(200).json({ message: "Up" });
  } catch (e) {
    return res.status(500).json({ message: "Down" });
  }
});

app.get("/lobbies", async (req, res) => {
  try {
    return res.status(200).json({ lobbies: LOBBIES });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get("/image", async (req, res) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = `data:image/png;base64,` + file.toString("base64");
    res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Error");
  }
});

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        broadcastConnection(ws, msg);
        break;
      case "update":
        try {
          console.log("update");
          const data = msg.image.replace(`data:image/png;base64,`, "");
          fs.writeFileSync(
            path.resolve(__dirname, "files", `${msg.id}.jpg`),
            data,
            "base64"
          );
          break;
        } catch (e) {
          console.log(e);
          break;
        }
      case "close":
        LOBBIES = LOBBIES.filter((lobby) => lobby !== msg?.id);
        break;
      default:
        break;
    }
  });
});

const connectionHandler = (ws, msg) => {
  try {
    CLIENTS.push(msg?.id);
    ws.id = msg?.id;
    if (msg?.public && !LOBBIES.includes(msg?.id)) {
      LOBBIES.push(msg?.id);
    }
    broadcastConnection(ws, msg);
  } catch (e) {
    console.log(e);
  }
};

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};

main();
