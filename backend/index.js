const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getPicture, updatePicture, deletePicture } = require("./utils/helpers");
const { Methods } = require("./utils/types");

const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 5000;

const LOBBIES = {};
let PUBLIC_LOBBIES = [];

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

app.get("/health", async (_, res) => {
  try {
    return res.status(200).json({ message: "Up" });
  } catch (e) {
    return res.status(500).json({ message: "Down" });
  }
});

app.get("/lobbies", async (_, res) => {
  try {
    return res.status(200).json({ lobbies: PUBLIC_LOBBIES });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

app.get("/image", async (req, res) => {
  try {
    const data = await getPicture(req.query.id);
    res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Error");
  }
});

app.ws("/", (ws, _) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case Methods.CONNECTION:
        connectionHandler(ws, msg);
        break;
      case Methods.DRAW:
        broadcastConnection(msg);
        updateImage(msg);
      case Methods.MESSAGE:
        broadcastConnection(msg);
        break;
      case Methods.CLOSE:
        closeConnectionHandler(ws, msg);
        break;
      default:
        break;
    }
  });
});

const closeConnectionHandler = (_, msg) => {
  try {
    if (LOBBIES[msg?.id]) {
      const newClients = LOBBIES[msg?.id].filter(
        (user) => user !== msg?.username
      );
      LOBBIES[msg?.id] = newClients;

      if (newClients.length === 0) {
        deleteImage(msg);
        delete LOBBIES[msg?.id];

        PUBLIC_LOBBIES = PUBLIC_LOBBIES.filter((lobby) => lobby !== msg?.id);
      } else {
        const message = {
          id: msg?.id,
          method: "close",
          users: LOBBIES[msg?.id] ?? [],
        };
        broadcastConnection(message);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const connectionHandler = (ws, msg) => {
  try {
    ws.id = msg?.id;
    if (LOBBIES[msg?.id]) {
      LOBBIES[msg?.id] = [...LOBBIES[msg?.id], msg?.username];
    } else {
      LOBBIES[msg?.id] = [msg?.username];
    }
    if (msg?.public && !PUBLIC_LOBBIES.includes(msg?.id)) {
      PUBLIC_LOBBIES.push(msg?.id);
    }

    const message = {
      id: msg?.id,
      method: "connection",
      users: LOBBIES[msg?.id] ?? [],
    };
    broadcastConnection(message);
  } catch (e) {
    console.log(e);
  }
};

const broadcastConnection = (msg) => {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};

const updateImage = async (msg) => {
  try {
    await updatePicture(msg);
  } catch (e) {
    console.log(e);
  }
};

const deleteImage = async (msg) => {
  try {
    await deletePicture(msg?.id);
  } catch (e) {
    console.log(e);
  }
};

main();
