import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { IMotorcycle, motorcycleZodSchema } from '../../../interfaces/IMotorcycle';
import Motorcycle from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';

describe('Motorcycle Service', () => {
	const motorcyclesModel = new Motorcycle();
	const motorcyclesService = new MotorcycleService(motorcyclesModel, motorcycleZodSchema);

	describe('Create Motorcycle', () => {
    before(() => {
      sinon.stub(motorcyclesModel, 'create').resolves(motorcycleMockWithId);
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const motorcycleCreated = await motorcyclesService.create(motorcycleMock);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
      let error;
      try {
        await motorcyclesService.create({} as IMotorcycle);
      } catch (err) {
        error = err
      }

        expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('Read list of all Motorcycles', () => {
    before(() => {
      sinon.stub(motorcyclesModel, 'read').resolves([motorcycleMockWithId]);
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const motorcycleCreated = await motorcyclesService.read();

			expect(motorcycleCreated).to.be.deep.equal([motorcycleMockWithId]);
		});
	});

	describe('ReadOne Motorcycle', () => {
    before(() => {
      sinon.stub(motorcyclesModel, 'readOne')
        .onCall(0).resolves(motorcycleMockWithId) 
        .onCall(1).resolves(null); 
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const motorcycleCreated = await motorcyclesService.readOne(motorcycleMockWithId._id);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
        let error;
			try {
				await motorcyclesService.readOne(motorcycleMockWithId._id);
			} catch (err:any) {
        error = err
			}

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
	
  describe('Update Motorcycle', () => {
    before(() => {
      sinon.stub(motorcyclesModel, 'update')
        .onCall(0).resolves(motorcycleMockWithId) 
        .onCall(1).resolves(null); 
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
			const motorcycleCreated = await motorcyclesService.update(motorcycleMockWithId._id, update as IMotorcycle);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
        let error;
			try {
				await motorcyclesService.update('123ERRADO', update as IMotorcycle);
			} catch (err:any) {
        error = err
			}

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

  describe('Delete Motorcycle', () => {
    before(() => {
      sinon.stub(motorcyclesModel, 'delete')
        .onCall(0).resolves(motorcycleMockWithId) 
        .onCall(1).resolves(null); 
    });
    
    after(() => sinon.restore());
  
		it('Success', async () => {
			const motorcycleCreated = await motorcyclesService.delete(motorcycleMockWithId._id);

			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
        let error;
			try {
				await motorcyclesService.delete('123ERRADO');
			} catch (err:any) {
        error = err
			}

      expect(error, 'error should be defined').not.to.be.undefined;
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
});