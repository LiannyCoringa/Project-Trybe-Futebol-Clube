import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  getLeaderboard(): Promise<ILeaderboard[]>,
}
