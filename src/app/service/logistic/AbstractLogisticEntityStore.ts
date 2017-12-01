import {ApiService} from '../core/api.service';
import {LogisticEntityInterface} from '../../model/logistic/logistic-entity-interface';
import {StoreService} from '../entity/store.service';

export abstract class AbstractLogisticEntityStore<T extends LogisticEntityInterface> extends StoreService<T> {

  constructor(protected api_service: ApiService) {
    super(api_service);
  }

  protected _processEntity(entity: T): object {
    const data = super._processEntity(entity);

    delete data['created_at'];
    delete data['updated_at'];
    data['departure_date'] = data['departure_date'] ? data['departure_date'].toLocaleDateString() : null;
    data['arrival_date'] = data['arrival_date'] ? data['arrival_date'].toLocaleDateString() : null;

    return data;
  }
}
