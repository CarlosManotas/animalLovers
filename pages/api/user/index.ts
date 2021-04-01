import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;
  const users = JSON.parse(fs.readFileSync('DB.json', 'utf-8'));
  switch (method) {
    case 'POST':
      const user = JSON.parse(body);
      const addUser = [...users, { ...user, id: uuidv4() }];
      fs.writeFileSync('DB.json', JSON.stringify(addUser, null, 2));
      setTimeout(() => res.status(201).end('ok'), 1000);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
