import { ZodSchema } from 'zod';
import IService from '../interfaces/IService';
import { IModel } from '../interfaces/IModel2';
import { ErrorTypes } from '../errors/catalog';

abstract class Service<T> implements IService<T> {
  constructor(protected _model:IModel<T>, protected _schema:ZodSchema<T>) {}

  public async create(obj:T):Promise<T> {
    const parsed = this._schema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create(parsed.data);
  }

  public async read():Promise<T[]> {
    const items = await this._model.read();
    if (!items) throw new Error(ErrorTypes.EntityNotFound);
    return items;
  }  
  
  public async readOne(_id:string):Promise<T> {
    const item = await this._model.readOne(_id);
    if (!item) throw new Error(ErrorTypes.EntityNotFound);
    return item;
  }
  
  public async update(_id:string, obj:T):Promise<T | null> {
    const parsed = this._schema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const updated = await this._model.update(_id, parsed.data);
    if (!updated) throw new Error('EntityNotFound');

    return updated;
  }
  
  public async delete(_id:string):Promise<T | null> {
    const deleted = await this._model.delete(_id);
    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);

    return deleted;
  }
}

export default Service;
