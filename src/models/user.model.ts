import { IUser } from '../interfaces/user.interface';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    roles: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<IUser>('User', userSchema);
