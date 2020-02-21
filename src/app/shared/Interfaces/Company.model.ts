import { KeyValueObject } from './../models/calendar.model';
export interface Company {
  name: string;
  subtitle: string;
  workingHours: string;
  maxNumberOfPeople: number;
  url: string;
  cars: Array<KeyValueObject>;
  rate: Array<object>;
}
