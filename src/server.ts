import app from "./app";

import { PORT } from "./constants";

app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
