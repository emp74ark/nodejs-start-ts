import express from 'express';
import fs from 'fs';
import { data } from '../controller/path-resolver';

type Record = { id: number; title: string; text: string; date: string };

function getData(): Record[] {
  const raw = fs.readFileSync(data, 'utf8');
  return JSON.parse(raw);
}

function updateData(newData: Record[]) {
  fs.writeFile(data, JSON.stringify(newData), (err) => {
    if (err) console.log(err);
  });
}

const router = express.Router();

router.get('/api', (request, response) => {
  response.status(200).json('API works');
});

router.get('/api/records', (request, response) => {
  response.status(200).json(getData());
});

router.get('/api/records/:id', (request, response) => {
  const { id } = request.params;
  const record = getData().find((i) => i.id == Number(id));
  response.status(200).json(record);
});

router.post('/api/records/', (request, response) => {
  const { title, text, date } = request.body;
  const record = {
    id: Date.now(),
    title,
    text,
    date,
  };
  const newData = [...getData(), record];
  updateData(newData);
  response.status(201).json(record.id);
});

router.put('/api/records/:id', (request, response) => {
  const { id } = request.params;
  const { title, text, date } = request.body;
  const record = { id: Number(id), title, text, date };
  const newData = getData().map((i) => (i.id == Number(id) ? (i = record) : i));
  updateData(newData);
  response.status(201).json(record);
});

router.delete('/api/records/:id', (request, response) => {
  const { id } = request.params;
  const newData = getData().filter((i) => i.id != Number(id));
  updateData(newData);
  response.status(202).json(id);
});

export default router;
