import { httpServer } from "./src/http_server/";
import { createWebSocketStream, WebSocketServer } from "ws";
import { controller } from "./src/services/control";

import parseData from "./src/utils/parseData";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on("connection", (ws) => {
  console.log(`WS Server connected on PORT ${WS_PORT}!`);

  const wsStream = createWebSocketStream(ws, {
    decodeStrings: false,
    encoding: "utf-8"
  });

  wsStream.on("data", async (data) => {
    console.log(data.toString());
    const parsed = parseData(data);
    const message = await controller(...parsed);
    wsStream.write(message);
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);
