import { Injectable } from '@angular/core';
import {AbstractLogisticSearchService} from "../AbstractLogisticSearchService";
import {Cargo} from "../../../model/logistic/cargo/cargo";
import {ApiService} from "../../core/api.service";

@Injectable()
export class SearchService extends AbstractLogisticSearchService<Cargo> {

    constructor(protected _apiService: ApiService) {
        super();
    }

    public get search_path(): string {
        return '/cargo/search.json';
    }
}
