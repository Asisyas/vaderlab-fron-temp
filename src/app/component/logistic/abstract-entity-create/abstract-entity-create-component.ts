import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {TRANSPORT_TYPE} from '../../../enum/logistic/transport-type';
import {LogisticEntityInterface} from '../../../model/logistic/logistic-entity-interface';
import {StoreService} from '../../../service/entity/store.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Inject, OnInit, ViewChild} from '@angular/core';
import {LOAD_TYPE} from '../../../enum/logistic/load-type';
import {FormErrorFactory} from '../../../service/forms/FormErrorFactory';


declare var window;

export abstract class AbstractEntityCreateComponent<T extends LogisticEntityInterface> implements OnInit
{
    public transport_type: object = TRANSPORT_TYPE;
    public load_type: object = LOAD_TYPE;
    public date_now: Date;
    public date_max: Date;
    @ViewChild('geocoder_arrival_input')
    public arrival_place_component;

    @ViewChild('geocoder_departure_input')
    public departure_place_component;
    public formErrors: any = null;

    protected _entityFormGroup: FormGroup;
    protected _entity;
    protected _dialogRef: MatDialogRef<AbstractEntityCreateComponent<T>>;
    protected _entityService: StoreService<T>;
    protected _formBuilder: FormBuilder;

    constructor() {
    }

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
        this._entity = Object.assign({}, entity);
    }

    ngOnInit() {
        this._formValidationInit();
        this.date_now = new Date();
        this.date_max = new Date( Date.now() * 1000 + 86400 * 365 );
    }

    cancelCreation(evt: Event): void {
        evt.preventDefault();

        this.dialogRef.close(null);
    }

    onSubmit(f: NgForm) {
        this.updatePosition();
        let action = 'create';
        if (this.entity.id) {
            action = 'update';
        }

        this.entity_service[action](this.entity)
            .then(entity => this.dialogRef.close(entity))
            .catch(error => {
                this._formValidationInit(error);
            });

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


    protected _formValidationInit(errors: any = null) {
        const self = this;
        this.formErrors = FormErrorFactory.getErrors(errors);

        this._entityFormGroup  = this._formBuilder.group({
            title: [ '', Validators.compose([
                Validators.min(3),
                Validators.max(30),
                this._validateTitle.bind(self),
            ])],
            departure_place: [ '' , Validators.compose([this._validateDeparturePlace.bind(self)])],
            arrival_place: [ '' , Validators.compose([this._validateArrivalPlace.bind(self)])],
            departure_date: ['', Validators.compose([this._validateDepartureDate.bind(self)])],
            arrival_date: ['', Validators.compose([this._validateArrivalDate.bind(self)])],
            is_permanent: [''],
            load_type: [ '', Validators.compose([this._validateLoadType.bind(self)])],
            transport_type: [ '', Validators.compose([this._validateTransportType.bind(self)])],
            volume: ['', Validators.compose([
                Validators.min(0),
                this._validateVolume.bind(self)
                ]
            ) ],
            weight: ['', Validators.compose([
                Validators.min(0),
                this._validateWeight.bind(self)
            ]) ]
        });
    }


    protected _validateTitle(control: FormControl) {
        return this._validate('title');
    }

    protected _validateDepartureDate(control: FormControl) {
        return this._validate('departure_date');
    }

    protected _validateArrivalDate(control: FormControl) {
        return this._validate('arrival_date');
    }

    protected _validateWeight(control: FormControl) {
        return this._validate('weight');
    }

    protected _validateVolume(control: FormControl) {
        return this._validate('volume');
    }

    protected _validateTransportType(control: FormControl) {
        return this._validate('transport_type');
    }

    protected _validateLoadType(control: FormControl) {
        return this._validate('load_type');
    }

    protected _validateArrivalPlace(control: FormControl) {
        return this._validate('arrival_place');
    }

    protected _validateDeparturePlace(control: FormControl) {
        return this._validate('departure_place');
    }

    protected _validate(prop: string) {
        const fe = this.formErrors.getError(prop);
        let err = null;
        const key = 'validate_' + prop;

        if (fe) {
            err = {};
            err[key] = true;
        }

        return err;
    }
}
