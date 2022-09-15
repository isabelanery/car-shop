import { ICar } from '../../interfaces/ICar';

const carMock:ICar = {
  model: 'BMW X1',
  year: 2022,
  color: 'black',
  status: true,
  buyValue: 287950,
  doorsQty: 4,
  seatsQty: 7,
}

const carMockWithId:ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'BMW X1',
  year: 2022,
  color: 'black',
  status: true,
  buyValue: 287950,
  doorsQty: 4,
  seatsQty: 7,
}

export { carMock, carMockWithId };
