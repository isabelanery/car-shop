import { motorcycleZodSchema } from '../interfaces/IMotorcycle';
import Motorcycle from '../models/Motorcycle';
import MotorcycleService from '../services/MotorcycleService';
import MotorcyleController from '../controllers/MotorcycleController';
import Route from './Route';

const model = new Motorcycle();
const service = new MotorcycleService(model, motorcycleZodSchema);
const controller = new MotorcyleController(service);

const router = new Route(controller);

export default router.execute();
