import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CargoFilterCreateComponent} from '../cargo-filter-create/cargo-filter-create.component';
import {FilterService} from "../../../service/logistic/cargo/filter.service";

@Component({
  selector: 'app-cargo-filter-my-list',
  templateUrl: './cargo-filter-my-list.component.html',
  styleUrls: ['./cargo-filter-my-list.component.css']
})
export class CargoFilterMyListComponent implements OnInit {

  public filterListObservable;
  private _isReady = false;

  constructor(
    public dialog: MatDialog,
    protected _filterService: FilterService
  ) { }

  isReady(){
    return this._isReady;
  }

  ngOnInit() {
    this.filterListObservable = this._filterService.listObservable;
      this._filterService.list().then(() => {
        this._isReady = true;
      });
  }

  createFilterDialog(filter: any = null) {
    const dialogRef = this.dialog.open(CargoFilterCreateComponent, {
      data: filter,
      disableClose: true,
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}
