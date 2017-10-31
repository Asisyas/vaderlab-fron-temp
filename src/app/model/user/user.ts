import {UserInterface} from './user-interface';

export class User implements UserInterface {

  private _id: number;
  private _username: string;
  private _roles: string[];
  private _groups: string[];

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get username(): string {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
  }

  public get roles(): string[] {
    return this._roles;
  }

  public set roles(roles: string[]) {
    this._roles = roles;
  }

  public get groups(): string[] {
    return this._groups;
  }

  public set groups(groups: string[]) {
    this._groups = groups;
  }
}
