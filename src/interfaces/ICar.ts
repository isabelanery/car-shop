import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = z.object({
  doorsQty: z.number().int().gte(2).lte(4),
  seatsQty: z.number().int().gte(2).lte(7),
});

const car = vehicleZodSchema.merge(carZodSchema);
type ICar = z.infer<typeof car>;

export { ICar, carZodSchema };
