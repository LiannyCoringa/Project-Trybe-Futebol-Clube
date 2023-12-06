import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
// import Example from '../database/models/ExampleModel';
import SequelizeTeams from '../database/models/TeamsModel';

// import { Response } from 'superagent';
import { team, teams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(function () { sinon.restore(); });

  it('should return all teams', async function () {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any[]);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  it('should return a teams by id', async function () {
    sinon.stub(SequelizeTeams, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });
  afterEach(sinon.restore);
});
