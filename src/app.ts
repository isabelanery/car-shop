import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import CarsRouter from './routers/CarsRouter';

const app = express();
app.use(express.json());

app.use('/cars', CarsRouter);

app.use(errorHandler);

export default app;
