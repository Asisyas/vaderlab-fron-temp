import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {environment} from '../../../environments/environment';
import {SessionService} from '../core/session.service';
import {UserInterface} from '../../model/user/user-interface';

@Injectable()
export class AuthService {

  constructor(    private oAuthService: OAuthService,
                  private sessionService: SessionService,
                  private http: Http) {
    this.oAuthService.loginUrl = environment.vaderlab_oauth_login_url;
    this.oAuthService.redirectUri = environment.vaderlab_oauth_redirect_uri;
    this.oAuthService.clientId = environment.vaderlab_oauth_client_id;
    this.oAuthService.issuer = environment.vaderlab_oauth_client_issuer;
    this.oAuthService.scope = environment.vaderlab_oauth_scope;
    this.oAuthService.oidc = false;
    this.oAuthService.setStorage(sessionService);
    this.oAuthService.logoutUrl = environment.vaderlab_oauth_logout_url;
    this.oAuthService.tryLogin({});
  }

  public login() {
    this.oAuthService.initImplicitFlow();
  }

  public logout() {
    this.oAuthService.logOut();
  }


  public get vaderlabOauthToken() {
    return this.oAuthService.getAccessToken();
  }

  public get vaderlaboauthScope() {
    return this.oAuthService.scope;
  }

  public get vaderlabIdToken() {
    return this.oAuthService.getIdToken();
  }
}
