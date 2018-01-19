import {Component, Input, OnInit} from '@angular/core';
import {CargoService} from '../../../service/logistic/cargo/cargo.service';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {Subject} from "rxjs/Subject";
import {SearchService} from "../../../service/logistic/cargo/search.service";
import {DataSource} from '@angular/cdk/collections';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'app-cargo-search',
    templateUrl: './cargo-search.component.html',
    styleUrls: ['./cargo-search.component.css']
})
export class CargoSearchComponent implements OnInit {

    displayedColumns: String[];

    dataSource: EntityDataSource;

    constructor(protected entity_search_service: SearchService) {
        this.dataSource = new EntityDataSource(this.entity_search_service.entitiesObservable);
        this.entity_search_service.startSearch();
    }

    ngOnInit() {
        this.displayedColumns = [
            'departure_place', 'arrival_place', 'title', 'transport_type',
            'load_type', 'departure_date', 'arrival_date', 'is_permanent'
        ];
    }
}

class EntityDataSource extends DataSource<any> {

    constructor(private data: Observable<Cargo[]>) {
        super();
    }

    connect(): Observable<Cargo[]> {
        return this.data;
    }

    disconnect() {}
}
