import {LogisticEntityInterface} from '../logistic-entity-interface';
import {LatLng} from './LatLng';

export class Cargo implements LogisticEntityInterface {

  public id: number;

  public title: string;

  public arrival_date: Date;

  public arrival_coordinates: LatLng;

  public departure_coordinates: LatLng;

  public departure_date: Date;

  public transport_type: string;

  public load_type: string;

  public weight: number;

  public volume: number;

  public is_permanent: boolean;

  public external_data: object;

  constructor(
    id: number = null,
    title: string = '',
    departure: LatLng = null,
    arrival: LatLng = null,
    arrival_date: Date  = null,
    departure_date: Date  = null,
    permanent = false,
    transport_type: string  = null,
    load_type: string  = null,
    weight: number = null,
    volume: number = null,
    external_data: object = {}
    ) {
      this.id = id;
      this.title = title;
      this.departure_coordinates = departure;
      this.arrival_coordinates = arrival;
      this.arrival_date = arrival_date;
      this.departure_date = departure_date;
      this.transport_type = transport_type;
      this.is_permanent = permanent;
      this.load_type = load_type;
      this.weight = weight;
      this.volume = volume;
      this.external_data = external_data;
  }
}
