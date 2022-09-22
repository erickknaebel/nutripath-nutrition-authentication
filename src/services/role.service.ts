/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { IRole } from '../interfaces/role.interface';
import Role from '../models/role.model';
import userToken from '../middlewares/token.middleware';
class RoleService {
  private UserToken = new userToken();

  /**
   * Service method to update information of the current user
   * @param {String} _id
   * @returns a object containing all the roles associeated to
   * a given user
   */
  public getAllRoles = async (): Promise<IRole[]> => {
    const data = await Role.find();
    return data;
  };

  /**
   * Service method to update information of the current user
   * @param {String} _id
   * @returns a object containing all the roles associeated to
   * a given user
   */
  public getUserRole = async (id: string): Promise<any> => {
    console.log(id);
    const name: string[] = [];
    await Role.findOne({ _id: { $eq: id } }).then((res: IRole) => {
      const obj = res.toJSON();
      name.push(obj.name);
    });
    return name;
  };
}

export default RoleService;
