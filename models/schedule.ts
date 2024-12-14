export interface Region {
    id: string;
    name: string;
    slug: string;
    type: string;
    nameWithType: string;
    code: number;
}

export interface Location {
    name: string;
    address: string;
    slug: string;
}

export interface TransportData {
    id: string;
    regionFrom: Region;
    regionTo: Region;
    from: Location;
    to: Location;
    duration: number;
    distance: number;
    price: number;
    vehicleTypeId: number;
    vehicleTypeName: string;
}