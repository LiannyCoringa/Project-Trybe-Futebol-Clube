import { IUsers } from './IUsers';

export interface IUsersModel {
  // create(data: Partial<IUsers>): Promise<IUsers>;
  findByEmail(email: string): Promise<IUsers | null>;
  findById(id: number): Promise<IUsers | null>;
}
