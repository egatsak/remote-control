import { mouse } from "@nut-tree/nut-js";

const getPosition = async () => {
  const position = await mouse.getPosition();
  return { x: position.x, y: position.y };
};

export default getPosition;
