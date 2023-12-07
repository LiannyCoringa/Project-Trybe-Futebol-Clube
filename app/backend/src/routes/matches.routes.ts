import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import authMiddleware from '../middlewares/authMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  authMiddleware.authMiddleware,
  (req: Request, res: Response) => matchesController.updateMatchFinish(req, res),
);

export default router;
