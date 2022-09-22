/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Error } from '../constants/error.messages';
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: Error.AUTHORIZATION
      };

    bearerToken = bearerToken.split(' ')[1];

    const { user }: any = await jwt.verify(
      bearerToken,
      `${process.env.SECRET_KEY}`
    );
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
