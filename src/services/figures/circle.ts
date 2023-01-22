import { Point, mouse, Button, straightTo } from "@nut-tree/nut-js";
const { PI, sin, cos } = Math;

const ITERATIONS = 90;

export default async (width: number) => {
  const radius = width / 2;
  const center = await mouse.getPosition();
  await mouse.pressButton(Button.LEFT);

  // x = r*cos t ; y = r*sin t ; 0 ≤ t < 2π - parametric circle equation
  // we can adjust iterations number to approach to the perfect circle

  for (let ang = 0; ang < ITERATIONS; ang++) {
    const x =
      center.x + radius * (1 - cos((ang * 2 * PI) / ITERATIONS));
    const y = center.y - radius * sin((ang * 2 * PI) / ITERATIONS);
    const point = new Point(x, y);
    await mouse.move(straightTo(point));
  }

  await mouse.releaseButton(Button.LEFT);
};
