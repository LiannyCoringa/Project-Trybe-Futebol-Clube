import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IMatches } from '../Interfaces/matches/IMatches';

export default class MatchesController {
  constructor(private matchesService: MatchesService = new MatchesService()) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const { status, data } = await this.matchesService.getAllMatches();
    const dataStringified = JSON.stringify(data);
    if (inProgress) {
      if (inProgress === 'true') {
        const filteredData = JSON.parse(dataStringified)
          .filter((match: IMatches) => match.inProgress);
        return res.status(mapStatusHTTP(status)).json(filteredData);
      }
      const filteredData = JSON.parse(dataStringified)
        .filter((match: IMatches) => match.inProgress === false);
      return res.status(mapStatusHTTP(status)).json(filteredData);
    }
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatchFinish(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { status, data } = await this.matchesService.updateMatchFinish(id);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
