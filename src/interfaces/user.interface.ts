import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string | number;
  name: string;
  email: string;
  password: string;
  roles: string[];
  token?: string;
}
