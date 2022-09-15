import { Router } from 'express';
import CarsController from '../controllers/CarsController';
import { carZodSchema } from '../interfaces/ICar';
import Cars from '../models/Cars';
import CarsService from '../services/CarService';

const model = new Cars();
const service = new CarsService(model, carZodSchema);
const controller = new CarsController(service);

const router = Router();

router.route('/')
  .get((req, res) => controller.read(req, res))
  .post((req, res) => controller.create(req, res));
  
router.route('/:id')
  .get((req, res) => controller.readOne(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.delete(req, res));
  
export default router;
