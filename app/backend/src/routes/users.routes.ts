import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/Validations';
import authMiddleware from '../middlewares/authMiddleware';

const usersController = new UsersController();

const router = Router();

router.get(
  '/role',
  authMiddleware.authMiddleware,
  (req: Request, res: Response) => usersController.getByRole(req, res),
);
router.post(
  '/',
  Validations.validateUser,
  (req: Request, res: Response) => usersController.findByEmail(req, res),
);

export default router;
