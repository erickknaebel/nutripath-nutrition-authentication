import express, { IRouter } from 'express';
import RoleRoutes from './role.route';
import userRoute from './user.route';

const router = express.Router();

/**
 * Function contains Application routes
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/account', new userRoute().getRoutes());
  router.use('/roles', new RoleRoutes().getRoutes());

  return router;
};

export default routes;
