import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

import User from '../models/User';
import { sendResponse } from '../utils/sendResponse';

import { UserInfoRequest } from '../utils/typeDefinitions';

const validateUserLayer = async (
  req: UserInfoRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return sendResponse(res, 401, undefined, 'E-100010');
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT SECRET NOT FOUND!');
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      if (!decode) return sendResponse(res, 500, undefined, 'E-100000');

      if (!decode.loggedIn)
        return sendResponse(res, 401, undefined, 'E-100003');

      const user = await User.findById(decode.id);

      if (!user) return sendResponse(res, 404, undefined, 'E-100005');

      if (!user.loggedIn) return sendResponse(res, 401, undefined, 'E-100004');

      req.user = user;

      next();
    } catch (error) {
      return sendResponse(res, 401, undefined, 'E-100001');
    }
  } else {
    return sendResponse(res, 401, undefined, 'E-100002');
  }
};

export default validateUserLayer;
