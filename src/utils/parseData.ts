import { RawData } from "ws";

export default (data: RawData) => {
  const parsed = data.toString().split(" ");
  return [parsed[0], parsed[1], parsed[2]];
};
