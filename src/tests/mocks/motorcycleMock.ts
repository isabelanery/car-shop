import { IMotorcycle } from '../../interfaces/IMotorcycle';

const motorcycleMock:IMotorcycle = {
  model: 'BMW X1',
  year: 2022,
  color: 'black',
  status: true,
  buyValue: 287950,
  category: 'Street',
  engineCapacity: 7,
}

const motorcycleMockWithId:IMotorcycle & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'BMW X1',
  year: 2022,
  color: 'black',
  status: true,
  buyValue: 287950,
  category: 'Street',
  engineCapacity: 7,
}

export { motorcycleMock, motorcycleMockWithId };
