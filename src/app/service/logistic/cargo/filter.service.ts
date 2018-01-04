import { Injectable } from '@angular/core';
import {StoreService} from '../../entity/store.service';
import {LogisticFilterEntityInterface} from '../../../model/logistic/logistic-filter-entity-interface';
import {ApiService} from '../../core/api.service';
import {AbstractLogisticFilterEntityStore} from "../AbstractLogisticFilterEntityStore";
import {Filter} from "../../../model/logistic/cargo/filter";

@Injectable()
export class FilterService extends AbstractLogisticFilterEntityStore<Filter> {

  protected get path_list(): string {
    return '/cargo/filter/list.json';
  }

  protected get path_create(): string {
    return '/cargo/filter/new.json';
  }

  protected get path_delete(): string {
    return undefined;
  }

  protected get path_update(): string {
      return '/cargo/filter';
  }

  constructor(protected api_service: ApiService) {
    super(api_service);
  }
}
