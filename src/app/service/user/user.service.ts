import {Injectable, Input, Output} from '@angular/core';
import {ApiService} from '../core/api.service';
import {AuthService} from '../secured/auth-service';
import {UserInterface} from '../../model/user/user-interface';
import { Observable } from 'rxjs/Rx';
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService {

  private _user: UserInterface;
  private _inited: boolean;
  private _logged: boolean;
  _initedChangeSubject: Subject<boolean> = new Subject();
  _loggedChangeSubject: Subject<boolean> = new Subject();

  constructor(private apiService: ApiService,
              private authService: AuthService ) {
    this._inited = false;
    this._logged = false;
    this.loadUser();
  }

  @Input()
  public get inited() {
    return this._inited;
  }

  public set inited(inited: boolean) {
    this._initedChangeSubject.next(inited);
    this._inited = inited;
  }

  @Input()
  public get user(): UserInterface|null {
    return this._user;
  }

  public set user(user: UserInterface|null){
    this._user = user;
    this.inited = true;
    this._logged = !!user;
    this._loggedChangeSubject.next(this.isLoggedIn());
  }

  public initedStateObserver(): Observable<boolean> {
    return this._initedChangeSubject;
  }

  public loadUser() {
    this.apiService.call('security/current_user.json', {})
      .then(res => this.user = res.json(), error => {
        this.inited = true;
      })
    ;
  }

  public clearUser() {
    this.user = null;
  }

  public getLoggedState(): Observable<boolean> {
    return this._loggedChangeSubject;
  }

  public isLoggedIn() {
    return this._logged;
  }

  protected registerListeners() {
    this.apiService.getErrorCodeObserver().subscribe(code => {

    });
  }
}
