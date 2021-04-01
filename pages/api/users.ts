import type { NextApiRequest, NextApiResponse } from 'next';

import users from '../../DB.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      // Get data from DB
      res.status(200).json(users);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
