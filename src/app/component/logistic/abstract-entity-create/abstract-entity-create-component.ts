import {NgForm} from '@angular/forms';
import {TRANSPORT_TYPE} from '../../../enum/logistic/transport-type';
import {LogisticEntityInterface} from '../../../model/logistic/logistic-entity-interface';
import {StoreService} from '../../../service/entity/store.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Inject, OnInit, ViewChild} from '@angular/core';
import {LOAD_TYPE} from '../../../enum/logistic/load-type';



export abstract class AbstractEntityCreateComponent<T extends LogisticEntityInterface> implements OnInit
{
    public transport_type: object = TRANSPORT_TYPE;
    public load_type: object = LOAD_TYPE;
    public date_now: Date;
    @ViewChild('geocoder_arrival_input')
    public arrival_place_component;
    @ViewChild('geocoder_departure_input')
    public departure_place_component;

    protected _entity;
    protected _dialogRef: MatDialogRef<AbstractEntityCreateComponent<T>>;
    protected _entityService: StoreService<T>;

    public get entity_service(): StoreService<T> {
        return this._entityService;
    }

    public get dialogRef(): MatDialogRef<AbstractEntityCreateComponent<T>> {
        return this._dialogRef;
    }

    public get entity(): T {
        return this._entity;
    }

    public set entity(entity: T) {
        this._entity = entity;
    }

    ngOnInit() {
        this.date_now = new Date();
    }

    cancelCreation(evt: Event): void {
        evt.preventDefault();

        this.dialogRef.close(null);
    }

    onSubmit(f: NgForm) {
        this.updatePosition();

        this.entity_service.create(this.entity)
            .then(entity => this.dialogRef.close(entity))
            .catch(error => {});

        return false;
    }

    protected _updateposition(place): string {
        if (!place || !place.geometry) {
            return null;
        }

        return place.place_id;
    }

    protected updatePosition() {
        this.entity.arrival_place = this._updateposition(this.arrival_place_component.position);
        this.entity.departure_place = this._updateposition(this.departure_place_component.position);
    }
}
