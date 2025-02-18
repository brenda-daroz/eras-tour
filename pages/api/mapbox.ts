// pages/api/mapbox.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ token: process.env.NEXT_PUBLIC_MAPBOX_API_KEY });
}