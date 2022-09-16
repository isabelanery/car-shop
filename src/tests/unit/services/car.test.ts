import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { carZodSchema, ICar } from '../../../interfaces/ICar';
import Cars from '../../../models/Cars';
import CarsService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
	const carsModel = new Cars();
	const carsService = new CarsService(carsModel, carZodSchema);

	describe('Create Car', () => {
    before(() => {
      sinon.stub(carsModel, 'create').resolves(carMockWithId);
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const carCreated = await carsService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
      let error;
      try {
        await carsService.create({} as ICar);
      } catch (err) {
        error = err
      }

        expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('Read list of all Cars', () => {
    before(() => {
      sinon.stub(carsModel, 'read').resolves([carMockWithId]);
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const carCreated = await carsService.read();

			expect(carCreated).to.be.deep.equal([carMockWithId]);
		});
	});

	describe('ReadOne Car', () => {
    before(() => {
      sinon.stub(carsModel, 'readOne')
        .onCall(0).resolves(carMockWithId) 
        .onCall(1).resolves(null); 
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const carCreated = await carsService.readOne(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
        let error;
			try {
				await carsService.readOne(carMockWithId._id);
			} catch (err:any) {
        error = err
			}

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
	
  describe('Update Car', () => {
    before(() => {
      sinon.stub(carsModel, 'update')
        .onCall(0).resolves(carMockWithId) 
        .onCall(1).resolves(null); 
    });
    
    after(() => sinon.restore());
  
    const update = {
      model: 'BMW X1',
      year: 2022,
      color: 'red',
      status: true,
      buyValue: 287900,
      doorsQty: 4,
      seatsQty: 7,
    }

		it('Success', async () => {
			const carCreated = await carsService.update(carMockWithId._id, update);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
        let error;
			try {
				await carsService.update('123ERRADO', update);
			} catch (err:any) {
        error = err
			}

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

  describe('Delete Car', () => {
    before(() => {
      sinon.stub(carsModel, 'delete')
        .onCall(0).resolves(carMockWithId) 
        .onCall(1).resolves(null); 
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const carCreated = await carsService.delete(carMockWithId._id);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
        let error;
			try {
				await carsService.delete('123ERRADO');
			} catch (err:any) {
        error = err
			}

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
});