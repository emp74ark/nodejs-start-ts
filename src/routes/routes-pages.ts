import express from 'express';
import { pages } from '../controller/path-resolver';
import records from '../model/records.json';
import { getData, updateData } from '../controller/data-resolvers';

const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).render(`${pages}/home.hbs`, { title: 'Home' });
});

router.get('/records', (request, response) => {
  response.status(200).render(`${pages}/records.hbs`, { title: 'Records', records });
});

router.get('/records/:id', (request, response) => {
  const { id } = request.params;
  const record = records.find((i) => i.id == Number(id));
  response.status(200).render(`${pages}/record.hbs`, { title: 'Record', record });
});

router.get('/create', (request, response) => {
  response.status(200).render(`${pages}/create.hbs`, { title: 'Create record' });
});

router.post('/records', (request, response) => {
  const { title, text, date } = request.body;
  const record = {
    id: Date.now(),
    title,
    text,
    date,
  };
  const newData = [...getData(), record];
  updateData(newData);
  response.status(201).render(`${pages}/records.hbs`, { title: 'Records', records });
});

export default router;
