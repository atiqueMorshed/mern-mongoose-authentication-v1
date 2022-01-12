import { NextFunction, Request, Response } from 'express';
import { UserInfoRequest } from '../utils/typeDefinitions';

const getTestPrivateRoute = (
  req: UserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  res
    .status(200)
    .json({ success: true, message: 'This is a test private route.' });
};

export default getTestPrivateRoute;
