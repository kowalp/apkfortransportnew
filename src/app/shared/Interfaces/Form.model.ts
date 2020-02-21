import { KeyValueObject } from './../models/calendar.model';
export interface FormModel {
  tripCategory: TripCategory[];
  numberOfPeople: TripCategory;
}

export interface TripCategory {
  data?: KeyValueObject[];
  name: string;
  optional: boolean;
  inputType: string;
  key: string;
  value: string;
}
