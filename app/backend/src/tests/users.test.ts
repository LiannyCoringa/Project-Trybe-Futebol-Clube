import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeUsers from '../database/models/UsersModel';
import usersMock from '../tests/mocks/users.mock';
// import Validations from '../middlewares/Validations';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Users Test', function() {
  it('ao não receber um email, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = usersMock.noEmailLoginBody
  
    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
  
    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
  it('ao não receber uma senha, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = usersMock.noPasswordLoginBody
    
    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);
    
    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
  it('ao receber um email inexistente, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = usersMock.notExistingUserBody
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
  it('ao receber um email existente e uma senha errada, retorne um erro', async function () {
    // Arrange
    const httpRequestBody = usersMock.existingUserWithWrongPasswordBody 

    const mockFindOneReturn = SequelizeUsers.build(usersMock.existingUser);
   
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockFindOneReturn);

    // Act
    const httpResponse = await chai.request(app).post('/login')
      .send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
  it('ao receber um email e uma senha válida, retorne um token de login', async function () {
    // Arrange
    const httpRequestBody = usersMock.validLoginBody
    const mockFindOneReturn = SequelizeUsers.build(usersMock.existingUser);
    sinon.stub(SequelizeUsers, 'findOne').resolves(mockFindOneReturn);

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  });
});