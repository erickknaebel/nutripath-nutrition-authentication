/* eslint-disable  @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { User } from '../constants/user.messages';
import userService from '../services/user.service';

class UserController {
  public UserService = new userService();

  /**
   * Controller to log a user in
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.loginUser(req.body);
      if (data === null) {
        return res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          message: User.USER_INVALID
        });
      }
      res
        .header({ Authorization: data.token })
        .status(HttpStatus.CREATED)
        .json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to log a user out
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.logoutUser();
      console.log('log user out...');
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.registerUser(req.body);
      if (data === null) {
        return res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          message: User.USER_EXISTS
        });
      }
      res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to create new user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public registerAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.registerAdmin(req.body);
      if (data === null) {
        return res.status(HttpStatus.CONFLICT).json({
          code: HttpStatus.CONFLICT,
          message: User.USER_EXISTS
        });
      }
      res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get all users available
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getAllUsers();
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.getUser(req.params._id);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to update a user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.updateUser(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to delete a single user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.UserService.deleteUser(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: User.USER_DELETED
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
