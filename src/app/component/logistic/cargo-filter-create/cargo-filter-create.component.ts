import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Filter } from '../../../model/logistic/cargo/filter';
import { PERMANENT_TYPE } from '../../../enum/logistic/permanent-type';
import { MapsAPILoader } from '@agm/core';
import 'leaflet.pm';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Promise} from "q";
import {FilterService} from "../../../service/logistic/cargo/filter.service";
import {AbstractFilterCreateComponent} from "../abstract-filter-create/abstract-filter-create";
import {AbstractLogisticFilterEntityStore} from "../../../service/logistic/AbstractLogisticFilterEntityStore";
import {LogisticFilterEntityInterface} from "../../../model/logistic/logistic-filter-entity-interface";

declare var turf, L, LGeo, window;

@Component({
    selector: 'app-cargo-filter-create',
    templateUrl: './cargo-filter-create.component.html',
    styleUrls: ['./cargo-filter-create.component.css']
})
export class CargoFilterCreateComponent extends AbstractFilterCreateComponent<Filter> implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CargoFilterCreateComponent>,
        protected __filterService: FilterService,
        protected __mapsAPILoader: MapsAPILoader,
        protected _formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public __filter: Filter,
    ) {
        super(dialogRef, __mapsAPILoader, _formBuilder);
        this.filter = this.__filter;
    }

    public get filterService(): AbstractLogisticFilterEntityStore<Filter> {
        return this.__filterService;
    }

    public get filter(): Filter {

        if(!this.__filter) {
            this.__filter = new Filter();
        }

        return this.__filter;
    }

    @Input()
    public set filter(filter: Filter) {
        this.__filter = Object.assign({}, filter);
    }
}
