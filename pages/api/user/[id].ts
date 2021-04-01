import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { UserInfo } from '../../../lib/helper-types';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
  } = req;
  const users: UserInfo[] = JSON.parse(fs.readFileSync('DB.json', 'utf-8'));
  switch (method) {
    case 'GET':
      const data = users.find((user) => user.id === id);
      if (!data) {
        res.status(404).end(`Doesn't exist this userId: ${id}`);
      } else {
        res.status(200).json(data);
      }
      break;
    case 'DELETE':
      const removeUser = users.filter((user) => user.id !== id);
      fs.writeFileSync('DB.json', JSON.stringify(removeUser, null, 2));
      setTimeout(() => res.status(200).end('ok'), 1000);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
