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
}
