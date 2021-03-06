import {LogisticEntityInterface} from '../logistic-entity-interface';

export class Cargo implements LogisticEntityInterface {

  public id: number | null;

  public title: string;

  public created_at: Date;

  public updated_at: Date;

  public arrival_date: Date;

  public arrival_place: string;

  public departure_place: string;

  public departure_date: Date;

  public transport_type: string;

  public load_type: string;

  public weight: number;

  public volume: number;

  public is_permanent: boolean;

  public extra_data: object;

  constructor(
    id: number = null,
    created_at: Date = null,
    updated_at: Date = null,
    title: string = '',
    departure: string = null,
    arrival: string = null,
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
      this.updated_at = updated_at;
      this.created_at = created_at;
      this.departure_place = departure;
      this.arrival_place = arrival;
      this.arrival_date = arrival_date;
      this.departure_date = departure_date;
      this.transport_type = transport_type;
      this.is_permanent = permanent;
      this.load_type = load_type;
      this.weight = weight;
      this.volume = volume;
      this.extra_data = external_data;
  }
}
