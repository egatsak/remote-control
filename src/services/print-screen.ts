import { screen, Region } from "@nut-tree/nut-js";
import Jimp from "jimp";
import getPosition from "./mouse-position";

export default async () => {
  const { x, y } = await getPosition();
  const region = new Region(x - 100, y - 100, 200, 200);

  const image = await screen.grabRegion(region);
  const imageRGB = await image.toRGB();
  const jimpImage = new Jimp(imageRGB);
  const jimpRead = await Jimp.read(jimpImage);
  const MIME = jimpRead.getMIME();
  const buffer = await jimpRead.getBase64Async(MIME);

  // buffer starts with MIME type - first 22 letters; we have to slice it out

  return "prnt_scrn " + buffer.slice(22);
};
