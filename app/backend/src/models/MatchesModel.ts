import SequelizeMatches from '../database/models/MatchesModel';
import SequelizeTeams from '../database/models/TeamsModel';
import { IMatches } from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async updateMatchFinish(id: string): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number):
  Promise<IMatches> {
    const match = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id }, returning: true },
    );
    return match[1][0];
  }

  async createMatch(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  )
    : Promise<IMatches> {
    const match = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match;
  }
}
