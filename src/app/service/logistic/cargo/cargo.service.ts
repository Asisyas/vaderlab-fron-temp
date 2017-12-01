import { Injectable } from '@angular/core';
import {AbstractLogisticEntityStore} from '../AbstractLogisticEntityStore';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {ApiService} from '../../core/api.service';

@Injectable()
export class CargoService extends AbstractLogisticEntityStore<Cargo> {

  constructor(protected api_service: ApiService) {
    super(api_service);
  }

  protected get path_list(): string {
    return '/cargo/my/list.json';
  }

  protected get path_update(): string {
    return '/cargo/my/update.json';
  }

  protected get path_create(): string {
    return '/cargo/my/new.json';
  }

  protected get path_delete(): string {
    return '/cargo/my/delete';
  }
}
