import path from "path";
å
export const PORT = 3000;
export const DEFAULT_HEIGHT = "200";
export const DEFAULT_WIDTH = "200";
export const MAX_HEIGHT = 1000;
export const MAX_WIDTH = 1000;

export const IMAGES = [
  "encenadaport",
  "fjord",
  "icelandwaterfall",
  "palmtunnel",
  "santamonica",
];

export const DEFAULT_IMAGE = IMAGES[0]

export const IMAGE_SOURCE_PATH = path.resolve(__dirname, "./images");
