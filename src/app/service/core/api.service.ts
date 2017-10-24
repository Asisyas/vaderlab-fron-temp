import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {Http, Request, RequestMethod, ResponseContentType} from '@angular/http';
import {HttpRequest} from '@angular/common/http';

@Injectable()
export class ApiService {

  private _base_url: string;

  constructor(
    private http: Http) {

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
      body: data
    });

    return this.http
      .request(req)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
