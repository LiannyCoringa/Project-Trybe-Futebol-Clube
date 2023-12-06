import * as bcrypt from 'bcryptjs';
import { TokenPayload } from '../Interfaces/jwt';
import { NewEntity } from '../Interfaces';
import UsersModel from '../models/UsersModel';
import { IUsers } from '../Interfaces/users/IUsers';
import { IUsersModel } from '../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import jwt from '../utils/jwt.util';

export default class UsersService {
  constructor(
    private usersModel: IUsersModel = new UsersModel(),
  ) { }

  public async findByEmail(data: NewEntity<IUsers>): Promise<ServiceResponse<TokenPayload>> {
    const regex = /[A-Za-z0-9]+@[A-Za-z]+\.[a-z]{2,3}/;
    if (!regex.test(data.email)) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }
    const userExists = await this.usersModel.findByEmail(data.email);
    if (!userExists || !bcrypt.compareSync(data.password, userExists.password)) {
      return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
    }
    // const newUser = await this.usersModel.create(data);
    const token = jwt.sign({ password: data.password });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
