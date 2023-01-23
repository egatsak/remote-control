import { RawData } from "ws";

export default (data: RawData) => {
  const parsed = data.toString().split(" ");
  let width: number | undefined;
  let height: number | undefined;

  if (parsed[1] !== undefined) {
    width = +parsed[1];
  }

  if (parsed[2] !== undefined) {
    height = +parsed[2];
  }
  return [parsed[0], width, height];
};
