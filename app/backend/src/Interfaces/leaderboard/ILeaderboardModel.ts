import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  getLeaderboardHome(): Promise<ILeaderboard[]>,
  getLeaderboardAway(): Promise<ILeaderboard[]>,
}
