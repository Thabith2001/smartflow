import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export type userRegister = {
  name: string;
  email: string;
  phone: string;
  homeAddress: string;
  role: string;
  password: string;
  confirmPassword: string,
};

export type DbUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
};

export type userLogin = {
  email: string;
  password: string;
};

export type userLoginResponse = {
  token: string;
  user: DbUser;
};

export type sessionType = {
  _id: ObjectId;
  role: string;
};

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};
