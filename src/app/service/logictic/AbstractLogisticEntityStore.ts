import {ApiService} from '../core/api.service';
import {RequestMethod} from '@angular/http';
import {LogisticEntityInterface} from '../../model/logistic/logistic-entity-interface';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export abstract class AbstractLogisticEntityStore<T extends LogisticEntityInterface> {

  private _entities: T[];
  private _listObservable: Subject<T[]>;
  private _count = 0;

  constructor(protected api_service: ApiService) {
    this._entities = null;
    this._listObservable = new Subject();
  }

  protected abstract get path_list(): string;
  protected abstract get path_create(): string;
  protected abstract get path_delete(): string;

  public get count() {
    return this._count;
  }

  public set count(count: number) {
    this._count = count;
  }

  public get entities() {
    return this._entities;
  }

  public set entities(entities: T[]) {
    this._entities = entities;
    this._listObservable.next(entities);
  }

  public create(entity: T): Promise<T> {

    const data: object = Object.assign({}, entity);
    delete data['id'];
    delete data['created_at'];
    delete data['updated_at'];

    this.processDates(entity, data);

    const promise = this.api_service.call(this.path_create, data, RequestMethod.Post);

    return promise
      .then(res => <T> res.json())
      .then(res => {
        this._entities.unshift(res);
        this._listObservable.next(this._entities);

        return res;
      });
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

  public list(): Promise<T[]> {
    const promise = this.api_service.call(this.path_list, {}, RequestMethod.Get);

    return promise
      .then(res => <T[]> res.json())
      .then(res => this.entities = res);
  }

  public get listObservable(): Observable<T[]> {
    return this._listObservable;
  }

  /*  public search(max_id?: number, limit: number = 50): Promise<T[]> {

    const data: object = { limit: limit };
    if (max_id) {
      data[max_id] = max_id;
    }

    const promise = this.api_service.call(this.path_search, data, RequestMethod.Get);

    return promise.then(res => <T[]> res.json());
  }
*/
  protected processDates(source: T, dest: object) {
    dest['departure_date'] = source.departure_date ? source.departure_date.toLocaleDateString() : null;
    dest['arrival_date'] = source.departure_date ? source.arrival_date.toLocaleDateString() : null;
  }
}
