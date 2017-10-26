import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {ApiService} from './service/core/api.service';
import {AuthService} from "./service/secured/auth-service";

declare var $;
declare var sessionStorage;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(private securedservice: AuthService) {
  }

  ngOnInit(): void {
    $('body').bootstrapMaterialDesign();
  }

  public login() {
    this.securedservice.login();
  }

  public logoff() {
    this.securedservice.logout();
  }

  public get name() {
    return '';
  }

}
