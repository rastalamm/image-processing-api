import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.listen(port, () => {

  return console.log(`server is listening on ${port}`);
});
app.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
        console.log('server startup error: address already in use');
    }
    else {
        console.log(err);
    }
})