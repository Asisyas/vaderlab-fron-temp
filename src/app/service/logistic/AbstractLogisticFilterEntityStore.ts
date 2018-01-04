/**
 data['departure_date'] = data['departure_date'] ? data['departure_date'].toLocaleDateString() : null;
 data['arrival_date'] = data['arrival_date'] ? data['arrival_date'].toLocaleDateString() : null;
 */

import {ApiService} from '../core/api.service';
import {StoreService} from '../entity/store.service';
import {LogisticFilterEntityInterface} from '../../model/logistic/logistic-filter-entity-interface';

export abstract class AbstractLogisticFilterEntityStore<T extends LogisticFilterEntityInterface> extends StoreService<T> {

    constructor(protected api_service: ApiService) {
        super(api_service);
    }

    protected _processEntity(entity: T): object {
        const data = super._processEntity(entity);

        delete data['created_at'];
        delete data['updated_at'];
        delete data['creator_id'];
        delete data['id'];

        data['departure_date_min'] = this._serializeDate(data['departure_date_min']);
        data['departure_date_max'] = this._serializeDate(data['departure_date_max']);

        data['arrival_date_min'] = this._serializeDate(data['arrival_date_min']);
        data['arrival_date_max'] = this._serializeDate(data['arrival_date_max']);

        return data;
    }

    protected _entityInit(entity: T) {
        entity.departure_date_min = this._parseDate(entity.departure_date_min);
        entity.departure_date_max = this._parseDate(entity.departure_date_max);
        entity.arrival_date_min = this._parseDate(entity.arrival_date_min);
        entity.arrival_date_max = this._parseDate(entity.arrival_date_max);
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
