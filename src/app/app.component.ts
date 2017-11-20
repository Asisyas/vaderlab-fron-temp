import {Component, Input, OnInit} from '@angular/core';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {ApiService} from './service/core/api.service';
import {AuthService} from "./service/secured/auth-service";
import {UserService} from "./service/user/user.service";

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent implements OnInit {

  title = 'app';

  @Input()
  ready =  false;

  constructor(
    private userService: UserService
  ) {
    this.userService.initedStateObserver().subscribe((ready) => {
      this.ready = ready;
    });
  }

  ngOnInit(): void {
    $('body').bootstrapMaterialDesign();
  }
}
