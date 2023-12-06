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
    const token = jwt.sign({ email: data.email, password: data.password });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findByUsersRole(authorization: string):
  Promise<ServiceResponse<{ role: string }>> {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token);
    const user = await this.usersModel.findByEmail(payload.email);
    if (!user) {
      return { status: 'INVALID_DATA', data: { message: 'Token must be a valid token' } };
    }
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
