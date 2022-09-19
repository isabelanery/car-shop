import { Router } from 'express';
import IController from '../interfaces/IController';

export default class Route {
  private router: Router;
  private controller: IController;

  constructor(controller: IController) {
    this.router = Router();
    this.controller = controller;
  }

  public execute() {
    this.router.route('/')
      .get((req, res) => this.controller.read(req, res))
      .post((req, res) => this.controller.create(req, res));
    
    this.router.route('/:id')
      .get((req, res) => this.controller.readOne(req, res))
      .put((req, res) => this.controller.update(req, res))
      .delete((req, res) => this.controller.delete(req, res));

    return this.router;
  }
}
