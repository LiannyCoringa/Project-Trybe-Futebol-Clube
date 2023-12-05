import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) { }

  public async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.getTeamById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
