import { httpServer } from "./src/http_server/";
import { WebSocketServer } from "ws";
import { controller } from "./src/services/control";

import parseData from "./src/utils/parseData";

const HTTP_PORT = 8181;

const wsServer = new WebSocketServer({ port: 8080 });

wsServer.on("connection", (ws) => {
  console.log("WS Server connected!");

  ws.on("message", async (data) => {
    console.log(data.toString());
    const parsed = parseData(data);
    await controller(ws, ...parsed);
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
