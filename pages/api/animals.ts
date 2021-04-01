import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as R from 'ramda';

import { Animals } from '../../lib/helper-types';

type Response = Animals[] | unknown[];

export default (req: NextApiRequest, res: NextApiResponse) => {
  const users = JSON.parse(fs.readFileSync('DB.json', 'utf-8'));
  switch (req.method) {
    case 'GET':
      // Get data from DB
      const animals: Response = [
        ...new Set(
          R.flatten(users.map((user: { animals: string[] }) => user.animals))
        ),
      ].sort();
      res.status(200).json(animals);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
