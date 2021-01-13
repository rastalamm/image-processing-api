import sharp, { OutputInfo } from "sharp";

import { IMAGE_SOURCE_PATH } from "./constants";
interface Resizer {
  sourceImage: string;
  width: number;
  height: number;
  outputFile: string;
}

export const getFullFilePath = (
  imageRequested: string,
  height: string,
  width: string
): string => {
  return `${IMAGE_SOURCE_PATH}/${imageRequested}_${height}_${width}.jpg`;
};

export const resizer = async ({
  sourceImage,
  width,
  height,
  outputFile,
}: Resizer): Promise<OutputInfo> => {
  return await sharp(sourceImage).resize(width, height).toFile(outputFile);
};
