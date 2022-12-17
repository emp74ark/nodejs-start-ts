import os from 'os';
import express, { response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import { styles } from './controller/path-resolver';

const port = Number(process.env.PORT);

const server = express();
server
  .listen(port, '127.0.0.1', () => {
    console.log(`start server at ${os.platform()}, ${os.version()}`);
  })
  .on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });

server.use((request, response, next) => {
  console.log(`Address: ${request.url}, port: ${port}, method: ${request.method}`);
  next();
});

server.use(express.static(styles));
server.use(express.urlencoded({ extended: false }));

server.get('/', (request, response) => {
  response.end('<h1>Server works!</>')
})
