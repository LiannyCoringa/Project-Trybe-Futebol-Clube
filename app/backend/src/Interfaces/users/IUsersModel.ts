import { IUsers } from './IUsers';

export interface IUsersModel {
  findAll(): Promise<IUsers[]>,
  findById(id: number): Promise<IUsers | null>
}
