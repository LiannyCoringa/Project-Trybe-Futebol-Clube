import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  updateMatchFinish(id: string): Promise<void>,
  updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number): Promise<IMatches>
}
