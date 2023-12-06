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
    const userExists = await this.usersModel.findByEmail(data.email);
    if (!userExists || !bcrypt.compareSync(data.password, userExists.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    // const newUser = await this.usersModel.create(data);
    const token = jwt.sign({ password: data.password });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
