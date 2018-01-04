import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {

    constructor() {}

    @Input()
    formErrors: any;

    @Input()
    field: string;

    ngOnInit() {
    }

}