import express from 'express';
import { pages } from '../controller/path-resolver';

const router = express.Router();

router.use((request, response) => {
  response.status(404).sendFile(`${pages}/error.html`);
});

export default router;
