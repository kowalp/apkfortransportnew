export interface Food {
  value: string;
  viewValue: string;
}
export interface User {
  id: number;
  email: string;
  name: string;
}
export interface GetHotel<MetaType = any> {
  Id?: number;
  HotelName: string;
}
export interface GetUsers<MetaType = any> {
  id?: number;
  email: string;
  name: string;
  role?: string;
}
export interface GetTours<MetaType = any> {
  Id?: number;
  Name: string;
  Price: number;
  PriceFrom5Persons: number;
  Duration: number;
  Commission: number;
  CommissionFrom5Persons: number;
}

export interface KeyValueObject {
  key: string;
  value: string;
}

export interface SelectedList {
  list: KeyValueObject[];
}
