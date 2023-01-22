import {
  up,
  left,
  right,
  down,
  mouse,
  Button
} from "@nut-tree/nut-js";

export default async (width: number, height: number) => {
  if (height === undefined) {
    height = width;
  }
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await mouse.move(down(height));
  await mouse.move(left(width));
  await mouse.move(up(height));
  await mouse.releaseButton(Button.LEFT);
};
