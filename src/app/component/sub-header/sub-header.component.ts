import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  @Input()
  public menu_items: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.data.forEach(value => {
      this.menu_items = value['menu_items'];
    });
  }

}
