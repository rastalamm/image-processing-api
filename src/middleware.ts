import fs from "fs";
import { Request, Response, NextFunction, RequestHandler } from "express";

import {
    DEFAULT_IMAGE,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  MAX_HEIGHT,
  MAX_WIDTH,
  IMAGES,
} from "./constants";

import {getFullFilePath} from "./utils";



export const validateParams: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const heightParam = req.params.height;
  const widthParam = req.params.width;
  const height = heightParam || DEFAULT_HEIGHT;
  const width = widthParam || DEFAULT_WIDTH;

  if (Number(height) > Number(MAX_HEIGHT)) {
    throw new Error(
      `The max height is ${MAX_HEIGHT}, please use a lower value`
    );
  }

  if (Number(width) > Number(MAX_WIDTH)) {
    throw new Error(`The max width is ${MAX_WIDTH}, please use a lower value`);
  }

  req.params.height = height;
  req.params.width = width;

  next();
};

// middlware for selecting a certain image
export const getImageQuery: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const query = req.query;
  const imageRequested = Array.isArray(query.image)
    ? query.image[0]
    : query.image;

  if (imageRequested && !IMAGES.includes(imageRequested.toString())) {
    throw new Error(`Cannot find image: ${imageRequested.toString()}`);
  }

  if (!imageRequested) {
      // Set the default image here if no image is specifically request
    req.query.image = DEFAULT_IMAGE;
  }
  next();
};

// caching layer
// checks if image exists and returns it if it does
export const findImage: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const imageRequested = "" + req.query.image;
  const { height, width } = req.params;
  const imageFile = getFullFilePath(imageRequested, height, width)

  fs.access(imageFile, (err) => {
    if (err) {
      // image does not exist, move on to next step to resize and save new image
      next();
    } else {
      const readStream = fs.createReadStream(imageFile);
      readStream.pipe(res);
    }
  });
};

