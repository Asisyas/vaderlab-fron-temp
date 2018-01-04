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
    data['departure_date'] = this._serializeDate(data['departure_date']);
    data['arrival_date'] = this._serializeDate(data['arrival_date'] );

    return data;
  }

  protected _entityInit(entity: T) {
    entity.departure_date = this._parseDate(entity.departure_date);
    entity.arrival_date = this._parseDate(entity.arrival_date);
  }

    protected _serializeDate(date: any) {
        if (!date) {
            return null;
        }


        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        return date.toLocaleDateString();
    }

    protected _parseDate(date: any) {
        if (!date) {
            return null;
        }

        if (date instanceof Date) {
            return date;
        }

        return new Date(date);
    }

}
