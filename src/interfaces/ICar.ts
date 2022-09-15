import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number({ required_error: 'Year is required' }).gte(1900).lte(2022),
  seatsQty: z.number({ required_error: 'Year is required' }).int(),
});

const car = vehicleZodSchema.merge(carZodSchema);
type ICar = z.infer<typeof car>;

export { ICar, carZodSchema };

// export interface ICar extends IVehicle {
//   doorsQty: number,
//   seatsQty: number,
// }