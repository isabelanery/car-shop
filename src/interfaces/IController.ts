import { Request, Response } from 'express';

interface IController<T> {
  create(req: Request, res: Response):Promise<Response>,
  read(req: Request, res: Response):Promise<Response>,
  readOne(req: Request, res: Response):Promise<Response>,
  update(req: Request, res: Response, obj:T):Promise<Response>,
  delete(req: Request, res: Response):Promise<Response>,
}

export default IController;
