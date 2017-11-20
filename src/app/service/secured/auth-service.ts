import { Injectable } from '@angular/core';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {environment} from '../../../environments/environment';
import {SessionService} from '../core/session.service';

declare var document;

@Injectable()
export class AuthService {

  constructor(    private oAuthService: OAuthService,
                  private sessionService: SessionService
  ) {
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
    document.location.reload();
  }
}
