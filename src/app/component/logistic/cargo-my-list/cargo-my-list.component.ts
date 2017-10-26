import { Component, OnInit } from '@angular/core';
import {CargoCreateComponent} from "../cargo-create/cargo-create.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-cargo-my-list',
  templateUrl: './cargo-my-list.component.html',
  styleUrls: ['./cargo-my-list.component.css']
})
export class CargoMyListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CargoCreateComponent, {
      // height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

}
