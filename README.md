# image-processing-api

Image Processing API for Udacity. Endpoint to request an image and define its size

### Installation

1. `npm run build` - creates the `dist` directory and copies the images to it.
2. `npm run start` - compiles Typescript to dist and runs express server.

### Available Scripts

- `build` - run first, creates the dist folder and copies the images to dist folder
- `copy-images` - copies the images to the dist folder
- `reset-images` - removes all of the images from the dist folder and copies the initial images back into the dist folder
- `start` - start the server
- `test` - test the application
- `lint` - runs the linter

## Endpoint

### `/images/?height/?width?image=<image_name>`

Method: `get`
URL Params: `height` and `width` - the height or width of the image in pixles (default is 200px, optional)
Query Param: `image` - the specific image you are requesting (optional).

#### Available Image options

1. `encenadaport`
2. `fjord`
3. `icelandwaterfall`
4. `palmtunnel`
5. `santamonica`

### Functionality

- User can query endpoint using various params and queries to retrive an image with a specified height and width.
- The default height and width is set to 200px.
- All images requested will be saved to disk.
- There is a cache layer. If a user requests an image size that has already been requested, there is no need for resizing and the previously resized image will be returned.
