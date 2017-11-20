import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Http, Request, RequestMethod, ResponseContentType, Headers} from '@angular/http';
import {ToastOptions, ToastyConfig, ToastyService} from 'ng2-toasty';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {Observable} from 'rxjs/Observable';

declare var sessionStorage;

@Injectable()
export class ApiService {

  private _base_url: string;
  private _errorCode?: number;

  constructor(
    private oAuthService: OAuthService,
    private http: Http,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {

    this.toastyConfig.theme = 'material';
    let vb = environment.base_backend_url;
    if (!vb.endsWith('/')) {
      vb += '/';
    }

    this._base_url = vb;
  }

  call(
    path: string,
    data: any = null,
    method: RequestMethod = RequestMethod.Get,
    responseType: ResponseContentType = ResponseContentType.Json) {

    if (path.startsWith('/')) {
      path = path.slice(1);
    }



    const req: Request = new Request({
      url: this._base_url + path,
      method: method,
      responseType: responseType,
      body: data,
      headers: this.createHeaders()
    });

    return this.http
      .request(req)
      .toPromise()
      .catch((reason: any) => {
        return this.handleError(reason);
      });
  }



  private createHeaders() {
    const headers = new Headers();
    const access_token = this.oAuthService.getAccessToken();
    if (access_token) {
      headers.append('Authorization', 'Bearer ' + access_token);
    }

    return headers;
  }

  public getErrorCodeObserver() {
    return Observable.of(this._errorCode);
  }

  private handleError(error: any): Promise<any> {
    this.showErrorMessage(error);
    return Promise.reject(error.message || error);
  }

  private showErrorMessage(error: any): void {
    const toastOptions: ToastOptions = {
      title: '',
      msg: '',
      showClose: true,
      timeout: 5000,
      theme: 'material'
    };

    switch (error.status) {
      case 0:
        toastOptions.title = 'Unknown error';
        toastOptions.msg = 'The server is unavailable, check your Internet connection or try again later.';
        this.toastyService.error(toastOptions);
        break;
      case 500:
        toastOptions.title = 'Internal server error';
        toastOptions.msg = 'Unknown internal server error, try again later.';
        this.toastyService.error(toastOptions);
        break;
    }
  }
}
