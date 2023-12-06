import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatches from '../database/models/MatchesModel';

import { matches } from './mocks/matches.mock';

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
});