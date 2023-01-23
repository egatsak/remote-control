import { WebSocket } from "ws";
import { up, down, left, right, mouse } from "@nut-tree/nut-js";

import circle from "./figures/circle";
import rectangle from "./figures/rectangle";
import getPosition from "./mouse-position";
import prntscrn from "./print-screen";

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

export const controller = async (...args: any) => {
  const [command, width, height] = args;
  const action = command.split("_")[1];
  let message;

  switch (true) {
    case command === "mouse_position": {
      const { x, y } = await getPosition();
      message = `mouse_position ${x},${y}`;
      break;
    }

    case command === "prnt_scrn": {
      message = await prntscrn();
      break;
    }

    case command.startsWith("mouse"): {
      const direction = Directions[action as keyof typeof Directions];
      await mouse.move(direction(width!));
      message = command;
      break;
    }

    case command.startsWith("draw"): {
      const figure = Figures[action as keyof typeof Figures];
      await figure(width, height);
      message = command;
      break;
    }

    default:
      message = "Unknown command: " + command;
  }

  return message;
};
