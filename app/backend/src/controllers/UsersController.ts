import { Request, Response } from 'express';
import UsersService from '../services/UsersService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UsersController {
  constructor(private usersService: UsersService = new UsersService()) { }

  public async findByEmail(req: Request, res: Response) {
    const { status, data } = await this.usersService.findByEmail(req.body);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
