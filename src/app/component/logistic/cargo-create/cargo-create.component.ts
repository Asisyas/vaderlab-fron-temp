import {Component, Input, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Cargo} from '../../../model/logistic/cargo/cargo';
import {LOAD_TYPE} from '../../../enum/logistic/load-type';
import {TRANSPORT_TYPE} from '../../../enum/logistic/transport-type';

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.css']
})
export class CargoCreateComponent implements OnInit {

  @Input()
  public cargo: Cargo;

  public transport_type: object = TRANSPORT_TYPE;
  public load_type: object = LOAD_TYPE;

  constructor() {
  }

  onSubmit(f: NgForm) {
    console.log(this.cargo);
  }

  ngOnInit() {
    if (null == this.cargo) {
      this.cargo = new Cargo();
    }
  }
}
