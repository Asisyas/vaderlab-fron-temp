import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CargoCreateComponent} from '../cargo-create/cargo-create.component';
import {MatDialog, MatSort} from '@angular/material';
import {CargoService} from '../../../service/logistic/cargo/cargo.service';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {UserService} from "../../../service/user/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cargo-my-list',
  templateUrl: './cargo-my-list.component.html',
  styleUrls: ['./cargo-my-list.component.css']
})
export class CargoMyListComponent implements OnInit {

  @Input()
  public displayedColumns = [
      'warning', 'departure_place', 'arrival_place', 'created_at', 'title', 'transport_type',
    'load_type', 'departure_date', 'arrival_date', 'is_permanent'
  ];
  @Input()
  public dataSource: ListDataSource;
  private _showPreloader = true;
  constructor(
    public dialog: MatDialog,
    private __router: Router,
    private __userService: UserService,
    private __cargoService: CargoService
  ) {
  }

  entityWarning(entity: Cargo) {
    const current_date = new Date();
    current_date.setMinutes(0);
    current_date.setHours(0);
    current_date.setSeconds(0);
    let status = false;

    if(entity.is_permanent === true) {
      return status;
    }

    if(entity.arrival_date && this._entityDateFormat(entity.arrival_date) < current_date) {
        status = true;
    }

    if((entity.departure_date && this._entityDateFormat(entity.departure_date) < current_date)) {
        status =  true;
    }

    return status;
  }


  _entityDateFormat(date) {
    return new Date(date);
  }

  ngOnInit() {

    // if (!this.__userService.isLoggedIn()) {
    //  this.__router.navigate(['/']);

//      return null;
//    }

    this.dataSource = new ListDataSource(this.__cargoService.listObservable);
    this.__cargoService.list().then(()=> {
      this._showPreloader = false;
    });
  }

  showPreloader(): boolean {
    return this._showPreloader;
  }

  openDialog(entity?: Cargo) {
    const dialogRef = this.dialog.open(CargoCreateComponent, {
      disableClose: true,
      data: entity || null,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


class ListDataSource extends DataSource<Cargo> {

  constructor(
    private _obs: Observable<Cargo[]>
  ) {
    super();
  }

  connect(): Observable<Cargo[]> {
    return this._obs;
  }

  disconnect() {}
}
