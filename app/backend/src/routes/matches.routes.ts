import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import authMiddleware from '../middlewares/authMiddleware';
import matchMiddleware from '../middlewares/matchMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id',
  authMiddleware.authMiddleware,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.patch(
  '/:id/finish',
  authMiddleware.authMiddleware,
  (req: Request, res: Response) => matchesController.updateMatchFinish(req, res),
);
router.post(
  '/',
  authMiddleware.authMiddleware,
  matchMiddleware.validateMatch,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
