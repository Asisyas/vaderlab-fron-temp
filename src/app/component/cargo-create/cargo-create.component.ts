import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cargo-create',
  templateUrl: './cargo-create.component.html',
  styleUrls: ['./cargo-create.component.css']
})
export class CargoCreateComponent implements OnInit {

  constructor() { }

  onSubmit(f: NgForm) {
    console.log(f['geo-arrival-place']);
  }

  ngOnInit() {
  }

}
