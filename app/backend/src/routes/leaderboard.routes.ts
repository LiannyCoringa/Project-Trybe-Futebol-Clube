import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/', (req: Request, res: Response) =>
  leaderboardController.getLeaderboard(req, res));
router.get('/home', (req: Request, res: Response) =>
  leaderboardController.getLeaderboardHome(req, res));
router.get('/away', (req: Request, res: Response) =>
  leaderboardController.getLeaderboardAway(req, res));

export default router;
