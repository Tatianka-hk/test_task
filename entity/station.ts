import  Connector from "./connector"

export default interface ChargingStation {
    id: string;
    title?: string;
    description?: string;
    address?: string;
    coordinates?: { lat: number; long: number };
    isPublic: boolean;
    connectors: Connector[];
}