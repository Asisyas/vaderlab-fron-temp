import { Injectable } from '@angular/core';
import {RequestMethod} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import {ApiService} from '../core/api.service';
import {EntityInterface} from '../../model/entity/entity-interface';
import {Observable} from 'rxjs/Observable';

@Injectable()
export abstract class StoreService<T extends EntityInterface> {

  protected abstract get path_list(): string;
  protected abstract get path_create(): string;
  protected abstract get path_delete(): string;
  protected abstract get path_update(): string;

  private _entities: T[];
  private _listObservable: Subject<T[]>;


  constructor(protected api_service: ApiService) {
    this._entities = [];
    this._listObservable = new Subject();
  }

  public create(entity: T): Promise<T> {
    const data: object = this._processEntity(entity);
    const id = data['id'];
    delete data['id'];

    return this._processPromise(this.api_service.call(
      this.path_create,
      data,
      RequestMethod.Post
    ));
  }

  public update(entity: T): Promise<T> {
    return this._processPromise(this.api_service.call(
      this.path_update + '/' + entity.id + '.json',
      this._processEntity(entity),
      RequestMethod.Put
    ));
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

  public remove(entity: T): Promise<boolean> {
    return null;
  }

  public get entities() {
    return this._entities;
  }

  public set entities(entities: T[]) {
    this._entities = entities;
    this._listObservable.next(entities);
  }

  public indexOf(entity: T): number {
    if (!entity.id) {
      return -1;
    }

    for (let i = 0; i < this._entities.length; i++) {
      const tmp = this._entities[i];
      if (tmp.id === entity.id) {
        return i;
      }
    }

    return -1;
  }

  protected _processEntity(entity: T): object {
    return Object.assign({}, entity);
  }

  protected _updateEntityCollection(entity: T): void {
    const index = this.indexOf(entity);
    this._entityInit(entity);

    if (index !== -1) {
      this._entities[index] = entity;
    } else {
      this._entities.unshift(entity);
    }

    this._listObservable.next(this._entities);

    console.log(this._entities);
  }

  protected _entityInit(entity: T): void {
  }

  protected _processPromise(promise: Promise<any>): Promise<T> {
    return promise
      .then(res => <T> res.json())
      .then(res => {
        this._updateEntityCollection(res);

        return res;
      });
  }
}


