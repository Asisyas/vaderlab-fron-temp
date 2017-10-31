import { Injectable } from '@angular/core';
import {UserInterface} from '../../model/user/user-interface';

declare var localStorage;

@Injectable()
export class SessionService implements Storage {

  [index: number]: string;
  [key: string]: any;

  private static PREFIX_SESS_SERVICE = '_sess_srvc';
  private static KEY_CURRENT_USR = '_crnt_usr';
  private static KEY_CURRENT_USR_ID = SessionService.PREFIX_SESS_SERVICE + '_' + SessionService.KEY_CURRENT_USR + '_id';
  private PREFIX: string;

  constructor() {
    this.PREFIX = '';
  }

  key(index: number): string {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.createKey(key));
  }

  public get length() {
    return localStorage.length;
  }

  public getItem(key: string, def: any = null): any {
    return localStorage.getItem(this.createKey(key));
  }

  public setItem(key: string, val: any) {
    localStorage.setItem(this.createKey(key), val);
  }

  public clear() {
    return this.clearAll();
  }

  public clearAll() {
    localStorage.clear();
  }

  public get user(): UserInterface {
    return this.getItem(this.createKey(SessionService.KEY_CURRENT_USR));
  }

  public set user(usr: UserInterface) {
    localStorage.setItem(SessionService.KEY_CURRENT_USR_ID, usr.id);
    this.setItem(this.createKey(SessionService.KEY_CURRENT_USR), usr);
  }

  protected getCurrUsrId(): number {
    const id = localStorage.getItem(SessionService.KEY_CURRENT_USR_ID);

    return id || '';
  }

  protected createKey(pubkey: string) {
    return this.PREFIX + '_' +
      SessionService.PREFIX_SESS_SERVICE + '_' +
      this.getCurrUsrId() + '_' +
      pubkey;
  }
}
