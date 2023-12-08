import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new MatchesModel()) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateMatchFinish(id: string): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.updateMatchFinish(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceMessage>> {
    await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  )
    : Promise<ServiceResponse<IMatches>> {
    const match = await this.matchesModel.createMatch(
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    );
    return { status: 'SUCCESSFUL', data: match };
  }
}
