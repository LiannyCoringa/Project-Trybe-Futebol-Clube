import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(private leaderboardModel: ILeaderboardModel = new LeaderboardModel()) { }

  public async getLeaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getLeaderboardHome();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  public async getLeaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getLeaderboardAway();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
