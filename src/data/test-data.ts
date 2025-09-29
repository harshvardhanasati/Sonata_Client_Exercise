export interface BookingData {
  departureAirport: string;
  destination: string;
  departureDate: string;
  hotelName: string;
  adults: number;
  children: number;
  childAge: number;
}

export interface PassengerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}