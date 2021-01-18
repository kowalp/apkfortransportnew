export interface CalendarEvent<MetaType = any> {
  Id?: number;
  Name?: string | number;
  start: Date;
  end: Date;
  title: string;
  Email: string;
  Phone: string;
  Transfer: string;
  Trip: string;
  PersonCount: string;
  Comment?: string;
  PickupFrom?: string;
  FlightNumber?: string;
  Price: number;
  TourType?: string;
  allDay?: boolean;
  cssClass?: string;
  resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  draggable?: boolean;
  meta?: MetaType;
}
