import { expect } from 'chai';
import * as sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/CarService';
import CarsController from '../../../controllers/CarsController';
import { carZodSchema } from '../../../interfaces/ICar';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Controller', () => {
  const carModel = new Cars()
  const carService = new CarsService(carModel, carZodSchema);
  const carController = new CarsController(carService);
  
  const req = {} as Request; 
  const res = {} as Response;

  describe('Create Car', () => {
    before(() => {
      sinon.stub(carService, 'create').resolves(carMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());

    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Read Car', () => {
    before(() => {
      sinon.stub(carService, 'read').resolves([carMock]);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());
    
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
  });
  
  describe('ReadOne Car', () => {
    before(() => {
      sinon.stub(carService, 'readOne').resolves(carMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());
    
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
  
  describe('Update Car', () => {
    before(() => {
      sinon.stub(carService, 'update').resolves(carMock);
  
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
      req.params = { id: carMockWithId._id };
      req.body = update;

      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });

  describe('Delete Car', () => {
    before(() => {
      sinon.stub(carService, 'delete').resolves(carMock);
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });
  
    after(() => sinon.restore());
    
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
});