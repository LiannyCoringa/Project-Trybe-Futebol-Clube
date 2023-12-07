import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatches from '../database/models/MatchesModel';

import { matches, matchesFinished, matchesInProgress, match } from './mocks/matches.mock';
import authMiddleware from '../middlewares/authMiddleware';
import jwtUtil from '../utils/jwt.util';
import validLoginBody from './mocks/users.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testando os matches', () => {
  beforeEach(function () { sinon.restore(); });
  
  it('should return all matches', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any[]);
  
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
  it('should return matches in progress', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgress as any[]);
  
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });
  it('should return finished matches', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesFinished as any[]);
  
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesFinished);
  });
  it('should return a message when update match finish', async function () {
    sinon.stub(SequelizeMatches, 'update').resolves([1]);
    sinon.stub(jwtUtil, 'verify').resolves();
  
    const { status, body } = await chai.request(app).patch('/matches/1/finish')
    .set('authorization', `Baerer ${jwtUtil.sign(validLoginBody.validLoginBody)}`);
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });
  // it('should return a message when update goals', async function () {
  //   sinon.stub(SequelizeMatches, 'update').returns;
  //   sinon.stub(jwtUtil, 'verify').resolves();
  
  //   const { status, body } = await chai.request(app).patch('/matches/1')
  //   .set('authorization', `Baerer ${jwtUtil.sign(validLoginBody.validLoginBody)}`)
  //   .send({ homeTeamGoals: 1, awayTeamGoals: 1 });
  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal({ message: 'Updated' });
  // });
  afterEach(sinon.restore);
});