import {LogisticFilterEntityInterface} from '../logistic-filter-entity-interface';
import {ANY} from '../../../enum/logistic/permanent-type';

export class Filter implements LogisticFilterEntityInterface {
  id: number | null;
  title: string;
  arrival_date_min: Date | null;
  arrival_date_max: Date | null;
  departure_date_min: Date | null;
  departure_date_max: Date | null;
  is_permanent: number = ANY;
  arrival_geometry: any | null;
  departure_geometry: any | null;
  volume_max: number | null;
  volume_min: number | null;
  weight_max: number | null;
  weight_min: number | null;
}
