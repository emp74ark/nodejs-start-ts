import * as dotenv from 'dotenv';
import express from 'express';
import os from 'os';
import { styles } from './controller/path-resolver';
import { default as pageRoutes } from './routes/routes-pages';
import { default as apiRoutes } from './routes/routes-api';
import { default as errorRoutes } from './routes/routes-err';
dotenv.config();

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
server.use(pageRoutes);
server.use(apiRoutes);
server.use(errorRoutes);
