import { WebSocket } from "ws";
import { up, down, left, right, mouse } from "@nut-tree/nut-js";

import circle from "./figures/circle";
import rectangle from "./figures/rectangle";
import square from "./figures/square";
import getPosition from "./mouse-position";

const Directions = {
  right,
  left,
  up,
  down
};

const Figures = {
  circle,
  rectangle,
  square: rectangle
};

export const controller = async (ws: WebSocket, ...args: any) => {
  const [command, width, height] = args;
  const action = command.split("_")[1];

  switch (true) {
    case command === "mouse_position": {
      const { x, y } = await getPosition();
      const message = `mouse_position ${x},${y}`;
      ws.send(message);
      break;
    }

    case command === "prnt_scrn": {
      console.log("prtsc");
      break;
    }

    case command.startsWith("mouse"): {
      const direction = Directions[action as keyof typeof Directions];
      await mouse.move(direction(width!));
      ws.send(command);
      return;
    }

    case command.startsWith("draw"): {
      const figure = Figures[action as keyof typeof Figures];
      await figure(width, height);
      ws.send(command);
      return;
    }

    default:
      console.log("Unknown command!");
  }
};
