import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {AuthService} from "../../service/secured/auth-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public navLinks: any;

  constructor(public userService: UserService,
              public authService: AuthService) {

    this.navLinks = [
      { path: '/cargo/search', label: 'Cargo' },
      // { path: '/transport/search', label: 'Transport' },
    ];

  }

  ngOnInit() {
  }
}
