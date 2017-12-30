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

  constructor(
    public dialog: MatDialog,
    private __filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterListObservable = this.__filterService.listObservable;
      this.__filterService.list();
  }

  createFilterDialog() {
    const dialogRef = this.dialog.open(CargoFilterCreateComponent, {
      disableClose: true,
      width: '900px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}
