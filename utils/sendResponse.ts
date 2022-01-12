import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserProp } from './typeDefinitions';

export const sendResponse = (
  res: Response,
  code: number,
  message?: string,
  log?: string
) => {
  if (message)
    return res.status(code).json({
      success: code >= 200 && code <= 300 ? true : false,
      message: message,
      log: log ? log : '',
    });

  if (code == 200 || code == 201)
    return res
      .status(code)
      .json({ success: true, message: 'Successful.', log: log ? log : '' });

  if (code == 400)
    return res
      .status(code)
      .json({ success: false, message: 'Bad Request.', log: log ? log : '' });
  if (code == 401)
    return res
      .status(code)
      .json({ success: false, message: 'Unauthorized.', log: log ? log : '' });
  if (code == 403)
    return res
      .status(code)
      .json({ success: false, message: 'Forbidden.', log: log ? log : '' });
  if (code == 404)
    return res
      .status(code)
      .json({ success: false, message: 'Not Found.', log: log ? log : '' });
  if (code == 406)
    return res.status(code).json({
      success: false,
      message: 'Not Acceptable.',
      log: log ? log : '',
    });
  if (code == 409)
    return res
      .status(code)
      .json({ success: false, message: 'Conflict.', log: log ? log : '' });
  if (code == 500)
    return res
      .status(code)
      .json({ success: false, message: 'Server Error.', log: log ? log : '' });
};

export const sendToken = (user: UserProp, code: number, res: Response) => {
  const token = user.getSignedToken();
  res.status(code).json({ success: true, token: token });
};

/** LOGS
 * E-100000 = JWT decoding failed.
 * E-100001 = WRONG JWT
 * E-100002 = Authorization Header -> Bearer not found.
 * E-100003 = Decoded JWT token has loggedIn set to false.
 * E-100004 = Received user has loggedIn set to false.
 * E-100004 = Received user has loggedIn set to false.
 * E-100005 = User not found from decoded JWT token id
 * E-100006 = No input
 * E-100007 = Invalid Email or password
 * E-100008 = User not found
 * E-100008 = User creation failed
 * E-100009 = Login Failed
 * E-100010 = Authorization Header -> Bearer token not found.
 */
