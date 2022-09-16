import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';
import Motorcycle from '../../../models/Motorcycle';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcycleModel = new Motorcycle();

  describe('creating a motorcycle', () => {
    before(async () => {
      sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    });
  
    after(()=> sinon.restore())
    
		it('successfully created', async () => {
			const newMotorcycle = await motorcycleModel.create(motorcycleMock);
			expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
		});
	});

  describe('searching for the list of motorcycles', () => {
    before(async () => {
      sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    });
  
    after(()=> sinon.restore())
    
		it('successfully found', async () => {
			const motorcyclesFound = await motorcycleModel.read();
			expect(motorcyclesFound).to.be.deep.equal([motorcycleMockWithId]);
		});
	});

  describe('searching a motorcycle', () => {
    before(async () => {
      sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    });
  
    after(()=> sinon.restore())
    
		it('successfully found', async () => {
			const motorcyclesFound = await motorcycleModel.readOne('62cf1fc6498565d94eba52cd');
			expect(motorcyclesFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found', async () => {
			try {
				await motorcycleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});
  
  describe('updating a motorcycle', () => {
    before(async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockWithId);
    });
  
    after(()=> sinon.restore())
    
    const update= {
      model: 'BMW 1000 RR',
      year: 2022,
      color: 'red',
      status: true,
      buyValue: 76950,
      category: 'Street',
      engineCapacity: 2100,
    }

		it('successfully updated', async () => {
			const motorcyclesFound = await motorcycleModel
      .update('62cf1fc6498565d94eba52cd', update as IMotorcycle);
			expect(motorcyclesFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found', async () => {
			try {
				await motorcycleModel.update('123ERRADO', update as IMotorcycle);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

  describe('deleting a motorcycle', () => {
    before(async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
    });
  
    after(()=> sinon.restore())
    
		it('successfully deleted', async () => {
			const motorcyclesFound = await motorcycleModel.delete('62cf1fc6498565d94eba52cd');
			expect(motorcyclesFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found', async () => {
			try {
				await motorcycleModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

});