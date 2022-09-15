import { Router } from 'express';
import MotorcyleController from '../controllers/MotorcycleController';
import { motorcycleZodSchema } from '../interfaces/IMotorcycle';
import Motorcycle from '../models/Motorcycle';
import MotorcycleService from '../services/MotorcycleService';

const model = new Motorcycle();
const service = new MotorcycleService(model, motorcycleZodSchema);
const controller = new MotorcyleController(service);

const router = Router();

router.route('/')
  .get((req, res) => controller.read(req, res))
  .post((req, res) => controller.create(req, res));
  
router.route('/:id')
  .get((req, res) => controller.readOne(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.delete(req, res));
  
export default router;
