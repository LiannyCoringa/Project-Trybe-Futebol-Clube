import { Request, Router, Response } from 'express';
import UsersController from '../controllers/UsersController';
import Validations from '../middlewares/Validations';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateUser,
  (req: Request, res: Response) => usersController.findByEmail(req, res),
);

export default router;
