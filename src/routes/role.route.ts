import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import userValidator from '../validators/user.validator';
import roleController from '../controllers/role.controller';

class RoleRoutes {
  private router = express.Router();
  private RoleController = new roleController();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.get('/', userAuth, this.RoleController.getRoles);

    this.router.get('/:id', this.RoleController.getUserRole);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default RoleRoutes;
