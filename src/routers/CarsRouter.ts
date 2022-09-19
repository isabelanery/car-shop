import { carZodSchema } from '../interfaces/ICar';
import Cars from '../models/Cars';
import CarsService from '../services/CarService';
import CarsController from '../controllers/CarsController';
import Route from './Route';

const model = new Cars();
const service = new CarsService(model, carZodSchema);
const controller = new CarsController(service);

const router = new Route(controller);

export default router.execute();
