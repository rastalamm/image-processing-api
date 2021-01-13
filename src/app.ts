import express, { Request, Response, NextFunction } from "express";
import fs from "fs";

import { IMAGE_SOURCE_PATH } from "./constants";
import { getImageQuery, validateParams, findImage } from "./middleware";
import { resizer } from "./utils";

const app = express();

app.get(
  "/image/:height?/:width?",
  getImageQuery,
  validateParams,
  findImage,
  async (req, res) => {
    const imageRequested = req.query.image;
    const height = Number(req.params.height);
    const width = Number(req.params.width);
    const sourceImage = `${IMAGE_SOURCE_PATH}/${imageRequested}.jpg`;

    const outputFile = `${IMAGE_SOURCE_PATH}/${imageRequested}_${height}_${width}.jpg`;
    try {
      await resizer({ sourceImage, width, height, outputFile });
      const readStream = fs.createReadStream(outputFile);
      readStream.pipe(res);
    } catch (err) {
      throw new Error("Error resizing image. Please try again later");
    }
  }
);

// Error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500);
  res.send(err.message);
});

// export default server
export default app;
