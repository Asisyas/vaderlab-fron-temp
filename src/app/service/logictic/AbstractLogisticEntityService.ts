import {ApiService} from '../core/api.service';
import {RequestMethod} from '@angular/http';
import {LogisticEntityInterface} from '../../model/logistic/logistic-entity-interface';

export abstract class AbstractLogisticEntityService<T extends LogisticEntityInterface> {

  constructor(protected api_service: ApiService) {
  }

  protected abstract get path_search(): string;
  protected abstract get path_create(): string;
  protected abstract get path_delete(): string;


  public create(entity: T): Promise<T> {

    const data: object = Object.assign({}, entity);
    delete data['id'];
    delete data['created_at'];
    delete data['updated_at'];

    this.processDates(entity, data);

    const promise = this.api_service.call(this.path_create, data, RequestMethod.Post);

    return promise.then(res => <T> res.json());
  }

  public search(): Promise<T[]> {

    const promise = this.api_service.call(this.path_search, {}, RequestMethod.Get);

    return promise.then(res => <T[]> res.json());
  }

  protected processDates(source: T, dest: object) {
    dest['departure_date'] = source.departure_date ? source.departure_date.toLocaleDateString() : null;
    dest['arrival_date'] = source.departure_date ? source.arrival_date.toLocaleDateString() : null;
  }
}
