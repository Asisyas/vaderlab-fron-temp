import {LatLng} from './cargo/LatLng';

export interface LogisticEntityInterface {
  id: number;
  is_permanent: boolean;
  external_data: object;
  arrival_date: Date;
  departure_date: Date;
  arrival_coordinates: LatLng;
  departure_coordinates: LatLng;
}
