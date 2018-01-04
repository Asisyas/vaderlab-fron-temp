import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ApiService} from "../core/api.service";
import {RequestMethod} from "@angular/http";
import {EntityInterface} from "../../model/entity/entity-interface";

export abstract class AbstractLogisticSearchService<T extends EntityInterface> {

    protected _entities: T[] = [];
    protected _entitiesObservable: Subject<T[]>;
    protected _apiService: ApiService;

    public abstract get search_path(): string;

    public startSearch(): void {
        this._call();
    }

    public stopSearch(): void {
    }

    public get entities(): T[] {
        return this._entities;
    }

    public get entitiesObservable(): Subject<T[]> {

        if(!this._entitiesObservable) {
            this._entitiesObservable = new Subject<T[]>();
        }

        return this._entitiesObservable;
    }

    protected _call(lastId: string|null = null) {
        this._apiService.call(
            this.search_path,
            { lid: lastId },
            RequestMethod.Get
        )
        .then(res => res.json())
        .then( res => {
            this._publishEntities(res);

            return res;
        })
        ;
    }


    protected _publishEntities(entities: T[]) {
        const nel   = entities.length;
        const el    = this.entities.length;

        if(nel === 0) {
            return;
        }

        if(el === 0) {
           this._publish(entities);

           return;
        }

        for(let i: number = 0; i < nel; i++) {
            const t: T = entities[i];
            const tp: number = this._indexOf(t);
            if(this._indexOf(t) === -1) {
                this._entities.push(t);

                continue;
            }

            this._entities[tp] = t;
        }

        this._entitiesObservable.next(this._entities);
    }

    protected _indexOf(entity: T) {
        const el = this.entities.length;

        for(let i = el - 1; i >= 0; --i) {
            const e: T = this.entities[i];
            if(e.id == entity.id) {
                return i;
            }
        }

        return -1;
    }

    protected _publish(entities: T[]) {
        this._entities = entities;
        this._entitiesObservable.next(this._entities);
    }
}