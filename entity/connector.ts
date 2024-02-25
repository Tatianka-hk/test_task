export default interface Connector {
    id: string;
    type: 'CCS' | 'CHAdeMO' | 'Type1' | 'Type2';
    maxPowerKW: number;
}

  