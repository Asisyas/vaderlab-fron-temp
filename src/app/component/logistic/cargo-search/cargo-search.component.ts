import {Component, Input, OnInit} from '@angular/core';
import {CargoService} from '../../../service/logictic/cargo/cargo.service';
import {Cargo} from '../../../model/logistic/cargo/cargo';

@Component({
  selector: 'app-cargo-search',
  templateUrl: './cargo-search.component.html',
  styleUrls: ['./cargo-search.component.css']
})
export class CargoSearchComponent implements OnInit {

  constructor(private cargo_service: CargoService) { }

  @Input()
  private cargoCollection: Cargo[];

  ngOnInit() {
    this.cargo_service.search().then(cargo => {
      this.cargoCollection = <Cargo[]>cargo;
      console.log(this.cargoCollection['_body']);
    });
  }

}
