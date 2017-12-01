import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CargoFilterCreateComponent} from '../cargo-filter-create/cargo-filter-create.component';

@Component({
  selector: 'app-cargo-filter-my-list',
  templateUrl: './cargo-filter-my-list.component.html',
  styleUrls: ['./cargo-filter-my-list.component.css']
})
export class CargoFilterMyListComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  createFilterDialog() {
    const dialogRef = this.dialog.open(CargoFilterCreateComponent, {
      disableClose: true,
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}
