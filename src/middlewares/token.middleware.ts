import { IUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';

/**
 * Middleware to generate token for a given user
 * @param {Object} body
 * @return {Sting} Bearer token
 */
class Token {
  public generate = (body: IUser): string => {
    return jwt.sign({ _id: body._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: `${process.env.TOKEN_EXP}`
    });
  };
}

export default Token;
