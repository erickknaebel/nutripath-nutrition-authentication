/* eslint-disable  @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../constants/role.messages';
import roleService from '../services/role.service';

class RoleController {
  public RoleService = new roleService();

  /**
   * Controller to get the roles associated
   * to the curren user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.RoleService.getAllRoles();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: Role.All_ROLES_SUCCESS
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get the roles associated
   * to the curren user
   * @param {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      console.log('role id ' + req.params.id);
      const data = await this.RoleService.getUserRole(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: Role.USER_ROLE_SUCCESS
      });
    } catch (error) {
      next(error);
    }
  };
}

export default RoleController;
