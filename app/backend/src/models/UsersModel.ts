// import { NewEntity } from '../Interfaces';
import SequelizeUsers from '../database/models/UsersModel';
import { IUsers } from '../Interfaces/users/IUsers';
import { IUsersModel } from '../Interfaces/users/IUsersModel';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  //   async create(data: NewEntity<IUsers>): Promise<IUsers> {
  //     const dbData = await this.model.create(data);

  //     const { id, username, role, email, password }: IUsers = dbData;
  //     return { id, username, role, email, password };
  //   }

  async findByEmail(email: string): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (!dbData) return null;
    const { id, username, role, password }: IUsers = dbData;
    return { id, username, role, email, password };
  }

  async findById(id: number): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (!dbData) return null;
    const { username, role, email, password }: IUsers = dbData;
    return { id, username, role, email, password };
  }
}
