import { KeyValueObject } from 'src/app/shared/models/calendar.model';

export interface TourData {
  arrivalTime: Date;
  name?: string;
  phone?: string;
  email: string;
  pickUpFrom?: string;
  personCount: string;
  tour?: string;
  transfer?: string;
  price: number;
  comment?: string
}
export interface EditTour {
  tour?: string;
  transfer?: string;
  basicPrice: number;
  advancePrice: number;
  tripLength: string;
  basicCommission: number;
  advanceCommission: number;
}

export interface DataTable {
  columns: KeyValueObject[];
  rows: any[];
}
