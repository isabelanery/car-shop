import { Request, Response } from 'express';
import IController from '../interfaces/IController';
import IService from '../interfaces/IService';

abstract class Controller<T> implements IController {
  constructor(protected _service: IService<T>) { }

  public async create(req: Request, res: Response) {
    const results = await this._service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }
  
  public async update(req: Request, res: Response) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    const result = await this._service.delete(req.params.id);
    return res.status(204).json(result);
  }
}

export default Controller;