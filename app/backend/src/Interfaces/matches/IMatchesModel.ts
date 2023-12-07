import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  updateMatchFinish(id: string): Promise<void>
}
