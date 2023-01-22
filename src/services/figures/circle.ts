import { Point, mouse, Button, straightTo } from "@nut-tree/nut-js";
const { PI, sin, cos } = Math;

export default async (width: number) => {
  const radius = width / 2;
  const center = await mouse.getPosition();
  await mouse.pressButton(Button.LEFT);

  // x = r*cos t ; y = r*sin t ; 0 ≤ t < 2π - parametric circle equation

  await mouse.releaseButton(Button.LEFT);
};
