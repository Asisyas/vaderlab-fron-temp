import { Injectable } from '@angular/core';
import {AbstractLogisticEntityService} from '../AbstractLogisticEntityService';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {ApiService} from '../../core/api.service';

@Injectable()
export class CargoService extends AbstractLogisticEntityService<Cargo> {

  constructor(protected api_service: ApiService) {
    super(api_service);
  }

  public create(cargo: Cargo): Promise<Cargo> {
    return super.create(cargo);
  }

  public search(): Promise<Cargo[]> {
    return super.search();
  }

  protected get path_search(): string {
    return '/cargo/list.json';
  }

  protected get path_create(): string {
    return '/cargo/new.json';
  }

  protected get path_delete(): string {
    return '/cargo/delete';
  }
}
