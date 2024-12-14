//for popular trip
export interface IRegion {
    id: string
    name: string
    slug: string
    type: string
    nameWithType: string
    code: number
}

export interface IVehicleInfo {
    vehicleTypeId: number
    vehicleTypeName: string
}

export interface IScheduleInGroup extends IVehicleInfo {
    id: string
    regionTo: IRegion
    duration: number
    distance: number
    price: number
}

export interface IScheduleGroupByRegion {
    name: string
    slug: string
    nameWithType: string
    schedules: IScheduleInGroup[]
}

//for chart
export interface BillData {
    numberOfBill: number;
    revenue: number;
    ratio: number;
    type: string;
    time: number;
}

export interface TripData {
    numberOfTrip: number;
    ratio: number | string;
    occupancyRate: number | string;
    type: string;
    time: number;
}

export interface ChartData {
    revenue: number;
    grossProfit: number | null;
    ratio: number;
    type: string;
    time: number;
    billChart: BillData[];
    tripChart: TripData[];
}