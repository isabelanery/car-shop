import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import Motorcycle from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleZodSchema } from '../../../interfaces/IMotorcycle';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';

describe('Motorcycle Controller', () => {
  const motorcycleModel = new Motorcycle()
  const motorcycleService = new MotorcycleService(motorcycleModel, motorcycleZodSchema);
  const motorcycleController = new MotorcycleController(motorcycleService);
  
  const req = {} as Request; 
  const res = {} as Response;

  describe('Create Motorcycle', () => {
    before(() => {
      sinon.stub(motorcycleService, 'create').resolves(motorcycleMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());

    it('Success', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });

  describe('Read Motorcycle', () => {
    before(() => {
      sinon.stub(motorcycleService, 'read').resolves([motorcycleMock]);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());
    
    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleMock])).to.be.true;
    });
  });
  
  describe('ReadOne Motorcycle', () => {
    before(() => {
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());
    
    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });
  
  describe('Update Motorcycle', () => {
    before(() => {
      sinon.stub(motorcycleService, 'update').resolves(motorcycleMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());

    const update = {
      model: 'BMW 1000 RR',
      year: 2022,
      color: 'red',
      status: true,
      buyValue: 76950,
      category: 'Street',
      engineCapacity: 2100,
    }
    
    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      req.body = update;

      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });

  describe('Delete Motorcycle', () => {
    before(() => {
      sinon.stub(motorcycleService, 'delete').resolves(motorcycleMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());
    
    it('Success', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    });
  });
});