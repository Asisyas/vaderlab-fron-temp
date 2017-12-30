/**
 data['departure_date'] = data['departure_date'] ? data['departure_date'].toLocaleDateString() : null;
 data['arrival_date'] = data['arrival_date'] ? data['arrival_date'].toLocaleDateString() : null;
 */

import {ApiService} from '../core/api.service';
import {StoreService} from '../entity/store.service';
import {LogisticFilterEntityInterface} from "../../model/logistic/logistic-filter-entity-interface";

export abstract class AbstractLogisticFilterEntityStore<T extends LogisticFilterEntityInterface> extends StoreService<T> {

    constructor(protected api_service: ApiService) {
        super(api_service);
    }

    protected _processEntity(entity: T): object {
        const data = super._processEntity(entity);

        delete data['created_at'];
        delete data['updated_at'];

        data['departure_date_min'] = data['departure_date_min'] ? data['departure_date_min'].toLocaleDateString() : null;
        data['departure_date_max'] = data['departure_date_max'] ? data['departure_date_max'].toLocaleDateString() : null;

        data['arrival_date_min'] = data['arrival_date_min'] ? data['arrival_date_min'].toLocaleDateString() : null;
        data['arrival_date_max'] = data['arrival_date_max'] ? data['arrival_date_max'].toLocaleDateString() : null;

        return data;
    }
}