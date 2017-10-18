import {LogisticEntityInterface} from '../logistic-entity-interface';

export class Cargo implements LogisticEntityInterface {

  public id: number;

  public title: string;

  public arrival_date: Date;

  public departure_date: Date;

  public transport_type: string;

  public load_type: string;

  public weight: number;

  public volume: number;

  public permanent: boolean;

  constructor(
    id: number = null,
    title: string = '',
    arrival_date: Date  = null,
    departure_date: Date  = null,
    permanent = false,
    transport_type: string  = null,
    load_type: string  = null,
    weight: number = null,
    volume: number = null
    ) {
      this.id = id;
      this.title = title;
      this.arrival_date = arrival_date;
      this.departure_date = departure_date;
      this.transport_type = transport_type;
      this.permanent = permanent;
      this.load_type = load_type;
      this.weight = weight;
      this.volume = volume;
  }
}
