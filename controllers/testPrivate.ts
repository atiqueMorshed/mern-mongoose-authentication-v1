import { NextFunction, Request, Response } from 'express';

const getTestPrivateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, message: 'This is a test private route.' });
};

export default getTestPrivateRoute;
