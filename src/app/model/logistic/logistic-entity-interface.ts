import {EntityInterface} from '../entity/entity-interface';

export interface LogisticEntityInterface extends EntityInterface {
  id: number | null;
  is_permanent: boolean;
  extra_data: object;
  created_at: Date;
  updated_at: Date;
  arrival_date: Date;
  departure_date: Date;
  arrival_place: string;
  departure_place: string;
}
