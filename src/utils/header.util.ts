import { Request, Response, NextFunction } from 'express';

class HeaderUtilities {
  /**
   * Expose header middleware to expose
   * Authorization header
   * @param  {Object}   req
   * @param  {Object}   res
   * @param  {Function} next
   */
  // eslint-disable-next-line no-unused-vars
  public expose = (req: Request, res: Response, next: NextFunction): void => {
    res.setHeader('Access-Control-Expose-Headers', 'Authorization');
    next();
  };
}

export default HeaderUtilities;
