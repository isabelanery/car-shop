// import * as sinon from 'sinon';
// import chai from 'chai';
// import Cars from '../../../models/Cars';
// import { Model } from 'mongoose';
// import { carMock, carMockWithId } from '../../mocks/carMock';
// const { expect } = chai;

// describe('Car Model', () => {
//   const carModel = new Cars();

//   // before(async () => {
//   //   sinon.stub(Model, 'create').resolves(carMockWithId);
//   //   sinon.stub(Model, 'find').resolves([carMockWithId]);
//   //   sinon.stub(Model, 'findOne').resolves(carMockWithId);
//   //   sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
//   //   sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
//   // });

//   // after(()=> sinon.restore())
  
//   describe('creating a car', () => {
//     before(async () => {
//       sinon.stub(Model, 'create').resolves(carMockWithId);
//     });
  
//     after(()=> sinon.restore())
    
// 		it('successfully created', async () => {
// 			const newCar = await carModel.create(carMock);
// 			expect(newCar).to.be.deep.equal(carMockWithId);
// 		});
// 	});

//   describe('searching for the list of cars', () => {
//     before(async () => {
//       sinon.stub(Model, 'find').resolves([carMockWithId]);
//     });
  
//     after(()=> sinon.restore())
    
// 		it('successfully found', async () => {
// 			const carsFound = await carModel.read();
// 			expect(carsFound).to.be.deep.equal([carMockWithId]);
// 		});
// 	});

//   describe('searching a car', () => {
//     before(async () => {
//       sinon.stub(Model, 'findOne').resolves(carMockWithId);
//     });
  
//     after(()=> sinon.restore())
    
// 		it('successfully found', async () => {
// 			const carsFound = await carModel.readOne('62cf1fc6498565d94eba52cd');
// 			expect(carsFound).to.be.deep.equal(carMockWithId);
// 		});

// 		it('_id not found', async () => {
// 			try {
// 				await carModel.readOne('123ERRADO');
// 			} catch (error: any) {
// 				expect(error.message).to.be.eq('InvalidMongoId');
// 			}
// 		});
// 	});
  
//   describe('updating a car', () => {
//     before(async () => {
//       sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
//     });
  
//     after(()=> sinon.restore())
    
//     const update = {
//       model: 'BMW X1',
//       year: 2022,
//       color: 'red',
//       status: true,
//       buyValue: 287900,
//       doorsQty: 4,
//       seatsQty: 7,
//     }

// 		it('successfully updated', async () => {
// 			const carsFound = await carModel.update('62cf1fc6498565d94eba52cd', update);
// 			expect(carsFound).to.be.deep.equal(carMockWithId);
// 		});

// 		it('_id not found', async () => {
// 			try {
// 				await carModel.update('123ERRADO', update);
// 			} catch (error: any) {
// 				expect(error.message).to.be.eq('InvalidMongoId');
// 			}
// 		});
// 	});

//   describe('deleting a car', () => {
//     before(async () => {
//       sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
//     });
  
//     after(()=> sinon.restore())
    
// 		it('successfully deleted', async () => {
// 			const carsFound = await carModel.delete('62cf1fc6498565d94eba52cd');
// 			expect(carsFound).to.be.deep.equal(carMockWithId);
// 		});

// 		it('_id not found', async () => {
// 			try {
// 				await carModel.delete('123ERRADO');
// 			} catch (error: any) {
// 				expect(error.message).to.be.eq('InvalidMongoId');
// 			}
// 		});
// 	});

// });