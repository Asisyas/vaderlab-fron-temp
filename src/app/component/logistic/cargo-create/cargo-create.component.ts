import {Component, Inject} from '@angular/core';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {CargoService} from '../../../service/logistic/cargo/cargo.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbstractEntityCreateComponent} from '../abstract-entity-create/abstract-entity-create-component';
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.css']
})
export class CargoCreateComponent extends AbstractEntityCreateComponent<Cargo> {

  constructor(
    protected _dialogRef: MatDialogRef<CargoCreateComponent>,
    protected _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) protected _entity: Cargo,
    protected _entityService: CargoService
  ) {
    super();
  }

  ngOnInit() {
    if(!this._entity) {
      this._entity = new Cargo();
    } else {
        this.entity = this._entity;
    }
  }
}
