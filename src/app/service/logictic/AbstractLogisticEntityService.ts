import {ApiService} from '../core/api.service';
import {RequestMethod} from '@angular/http';
import {LogisticEntityInterface} from '../../model/logistic/logistic-entity-interface';

export abstract class AbstractLogisticEntityService<T extends LogisticEntityInterface> {

  constructor(protected api_service: ApiService) {}

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

  public update(entity: T): Promise<T> {
    const data: object = Object.assign({}, entity);
    delete data['created_at'];
    delete data['updated_at'];

    this.processDates(entity, data);
    const promise = this.api_service.call(this.path_create, data, RequestMethod.Put);

    return promise.then(res => <T> res.json());
  }

  public remove(entity: T): Promise<any> {
    const data: object = Object.assign({}, entity);
    delete data['created_at'];
    delete data['updated_at'];

    this.processDates(entity, data);
    const promise = this.api_service.call(this.path_create, data, RequestMethod.Put);

    return promise.then(res => <any> res.json());
  }

  public search(max_id?: number, limit: number = 50): Promise<T[]> {

    const data: object = { limit: limit };
    if (max_id) {
      data[max_id] = max_id;
    }

    const promise = this.api_service.call(this.path_search, data, RequestMethod.Get);

    return promise.then(res => <T[]> res.json());
  }

  protected processDates(source: T, dest: object) {
    dest['departure_date'] = source.departure_date ? source.departure_date.toLocaleDateString() : null;
    dest['arrival_date'] = source.departure_date ? source.arrival_date.toLocaleDateString() : null;
  }
}
