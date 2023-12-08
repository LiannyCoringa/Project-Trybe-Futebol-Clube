import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import queryHome from '../utils/queryHome';

export default class LeaderboardModel implements ILeaderboardModel {
  private sequelize = sequelize;

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const dbData = await this.sequelize.query(queryHome, {
      type: QueryTypes.SELECT }) as ILeaderboard[];
    return dbData;
  }
}
