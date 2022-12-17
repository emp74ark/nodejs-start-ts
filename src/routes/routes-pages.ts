import express from 'express';
import { pages } from '../controller/path-resolver';

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).sendFile(`${pages}/home.html`);
});

router.get('/records', (request, response) => {
  response.status(200).sendFile(`${pages}/records.html`);
});

router.get('/records/:id', (request, response) => {
  response.status(200).sendFile(`${pages}/record.html`);
});

export default router;
