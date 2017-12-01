import { Injectable } from '@angular/core';
import {StoreService} from '../../entity/store.service';
import {LogisticFilterEntityInterface} from '../../../model/logistic/logistic-filter-entity-interface';
import {ApiService} from '../../core/api.service';

@Injectable()
export class FilterService extends StoreService<LogisticFilterEntityInterface> {

  protected get path_list(): string {
    return '/api/cargo/filter/list.json';
  }

  protected get path_create(): string {
    return '/api/cargo/filter/new.json';
  }

  protected get path_delete(): string {
    return undefined;
  }

  protected get path_update(): string {
    return undefined;
  }

  constructor(protected api_service: ApiService) {
    super(api_service);
  }
}
