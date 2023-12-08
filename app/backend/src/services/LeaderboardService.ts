import LeaderboardModel from '../models/LeaderboardModel';
import { ILeaderboard } from '../Interfaces/leaderboard/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/leaderboard/ILeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LeaderboardService {
  constructor(private leaderboardModel: ILeaderboardModel = new LeaderboardModel()) { }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.getLeaderboard();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
