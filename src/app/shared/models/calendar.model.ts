export interface Food {
  value: string;
  viewValue: string;
}
export interface User {
  id: number;
  email: string;
  name: string;
}
export interface GetHotel {
  Id?: number;
  HotelName: string;
}
export interface GetUsers {
  id?: number;
  email: string;
  name: string;
  role?: string;
}
export interface KeyValueObject {
  key: string;
  value: string;
}

export interface SelectedList {
  list: KeyValueObject[];
}
