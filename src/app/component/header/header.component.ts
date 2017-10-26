import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public navLinks: any;

  constructor() {

    this.navLinks = [
      { path: '/cargo/search', label: 'Cargo' },
      // { path: '/transport/search', label: 'Transport' },
    ];

  }

  ngOnInit() {
  }
}
