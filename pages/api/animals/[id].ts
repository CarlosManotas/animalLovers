import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as R from 'ramda';

import { UserInfo } from '../../../lib/helper-types';

const truncate = (size: number) => R.take(size);

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id, size = 10 },
  } = req;
  const users: UserInfo[] = JSON.parse(fs.readFileSync('DB.json', 'utf-8'));
  const idOnlyString = Array.isArray(id) ? id[0] : id;
  switch (method) {
    case 'GET':
      const animal = users
        .filter((user) => user.isActive)
        .filter((user) => user.animals.indexOf(idOnlyString) > -1)
        .sort((a, b) => b.points - a.points);

      const final = truncate(Number(size))(animal);
      setTimeout(() => res.status(200).json(final), 1000);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
