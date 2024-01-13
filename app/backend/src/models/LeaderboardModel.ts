import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import queryHome from '../utils/queryHome';
import queryAway from '../utils/queryAway';
import queryAll from '../utils/queryAll';

export default class LeaderboardModel implements ILeaderboardModel {
  private sequelize = sequelize;

  async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const dbData = await this.sequelize.query(queryHome, {
      type: QueryTypes.SELECT }) as ILeaderboard[];
    return dbData;
  }

  async getLeaderboardAway(): Promise<ILeaderboard[]> {
    const dbData = await this.sequelize.query(queryAway, {
      type: QueryTypes.SELECT }) as ILeaderboard[];
    return dbData;
  }

  async getLeaderboard(): Promise<ILeaderboard[]> {
    const dbData = await this.sequelize.query(queryAll, {
      type: QueryTypes.SELECT }) as ILeaderboard[];
    return dbData;
  }
}
