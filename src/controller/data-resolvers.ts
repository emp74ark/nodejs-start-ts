import fs from 'fs';
import { data } from '../controller/path-resolver';
import { Record } from '../types';

function getData(): Record[] {
  const raw = fs.readFileSync(data, 'utf8');
  return JSON.parse(raw);
}

function updateData(newData: Record[]) {
  fs.writeFile(data, JSON.stringify(newData), (err) => {
    if (err) console.log(err);
  });
}

export { getData, updateData };
