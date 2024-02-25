import express from 'express'
import bodyParser from 'body-parser';
import chargingStationRouter from './routers/chargingStation';
import validateChargingStationMiddleware from  './middleware';
import dotenv  from 'dotenv';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(validateChargingStationMiddleware)
app.use('/chargingStation',chargingStationRouter );

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${process.env.port}`);
});