import Connector from "./entity/connector";
import  ChargingStation from "./entity/station"
import express from 'express'
const validateMiddleware = (req: express.Request, res: express.Response, next:express.NextFunction) => {
    let  stationData: ChargingStation= req.body ? req.body : {};
    let errors = [];
  
    if (!stationData.id || !stationData.connectors || typeof stationData.isPublic !== 'boolean' || !validateCoordinates(stationData)) {
      errors.push('Invalid charging station data');
    }
    if (stationData.isPublic && (!stationData.title || !stationData.description || !stationData.address || !stationData.coordinates)) {
      errors.push('Public stations must have title, description, address, and coordinates');
    }
    if(validateConnectors(stationData.connectors) === false){
        errors.push("Invalid connector data")
    }
    if (errors.length === 0) {
      next(); 
    } else {
      return res.status(400).json({ isValid: false, errors });
    }
};
const validateConnectors = (connectors:Connector[])=>{
    if (connectors.length < 1 || connectors.length > 8){ return false}
    for (const connector of connectors) {
        if (!connector.id || !connector.type || !connector.maxPowerKW || !['CCS', 'CHAdeMO', 'Type1', 'Type2'].includes(connector.type) 
        ||connector.maxPowerKW < 0 || connector.maxPowerKW > 100) {
            return false;
        }
    }
    return true;
}
const validateCoordinates = (station:ChargingStation)=>{
    if (station.coordinates) {
        const { lat, long } = station.coordinates;
        if (lat < -90 || lat > 90 || long < -180 || long > 180) {
            return false
        }
    }
    return true;
}
export default  validateMiddleware
