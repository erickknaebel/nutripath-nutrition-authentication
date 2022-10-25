/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import crypt from 'bcrypt';
import { Error as Errors } from '../constants/error.messages';
import { Role as Roles } from '../constants/role.messages';
import { IRole } from '../interfaces/role.interface';
import { IUser } from '../interfaces/user.interface';
import Role from '../models/role.model';
import User from '../models/user.model';
import userToken from '../middlewares/token.middleware';

class UserService {
  private UserToken = new userToken();

  /**
   * Service method to login the user in
   * @param {Object} body
   * @returns an object containing the user
   */
  public loginUser = async (body: IUser): Promise<IUser> => {
    const userData = await User.findOne({ email: body.email });
    if (!userData) {
      return null;
    } else {
      if (await crypt.compare(body.password, userData.password)) {
        const data = userData.toJSON();
        delete data.password;
        delete data.__v;
        data.token = this.UserToken.generate(body);
        return data;
      } else {
        return null;
      }
    }
  };

  /**
   * Service method to login the user in
   * @param {Object} body
   * @returns an object containing the user
   */
  public logoutUser = async (): Promise<any> => {
    return null;
  };

  /**
   * Service method to register a new user
   * @param {Object} body
   * @returns an object containing the new user
   */
  public registerUser = async (body: IUser): Promise<IUser> => {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      body.password = await crypt.hash(body.password, 10);
      const userRoles: string[] = [];
      await Role.findOne({ name: { $eq: Roles.USER_ROLE } }).then(
        (res: IRole) => {
          const data = res.toJSON();
          const r: string = data.name;
          userRoles.push(r);
          body.roles = userRoles;
        }
      );
      try {
        const user = await User.create(body);
        return user;
      } catch (error) {
        throw new Error(Errors.TRANSACTION_FAILED);
      }
    } else {
      return null;
    }
  };

  /**
   * Service method to register a new admin
   * @param {Object} body
   * @returns an object containing the new user
   */
  public registerAdmin = async (body: IUser): Promise<IUser> => {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      body.password = await crypt.hash(body.password, 10);
      const userRoles: string[] = [];
      await Role.find({ name: { $in: [Roles.USER_ROLE, Roles.ADMIN_ROLE] } })
        .lean()
        .then((res: IRole[]) => {
          res.forEach((type) => {
            userRoles.push(type.name);
          });
          body.roles = userRoles;
        });

      try {
        const user = await User.create(body);
        return user;
      } catch (error) {
        throw new Error(Errors.TRANSACTION_FAILED);
      }
    } else {
      return null;
    }
  };

  /**
   * Service method to get all the users
   * @returns a list of all users
   */
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await User.find();
    return data;
  };

  /**
   * Service method to get the current user
   * @param {String} _id
   * @returns an object containing the current user
   */
  public getUser = async (_id: string): Promise<IUser> => {
    const data = await User.findById(_id);
    return data;
  };

  /**
   * Service method to update information of the current user
   * @param {String} _id
   * @param {Object} body
   * @returns an object of the updated user data
   */
  public updateUser = async (_id: string, body: IUser): Promise<IUser> => {
    const data = await User.findByIdAndUpdate(
      {
        _id
      },
      body,
      {
        new: true
      }
    );
    return data;
  };

  /**
   * Service method to update information of the current user
   * @param {String} _id
   * @returns an empty string
   */
  public deleteUser = async (_id: string): Promise<string> => {
    await User.findByIdAndDelete(_id);
    return '';
  };
}

export default UserService;
