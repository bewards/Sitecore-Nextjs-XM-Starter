/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    JSS_EDITING_SECRET: process.env.JSS_EDITING_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_URL: process.env.PUBLIC_URL,
    JSS_APP_NAME: process.env.JSS_APP_NAME,
    APP_ENV: process.env.APP_ENV,
  });
}
