import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  clean(): void {
    window.sessionStorage.clear();
  }
  public saveUser(user: any): void {
    console.log("begin")
    window.sessionStorage.removeItem(USER_KEY);
    console.log("middle -after removing")
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log("final")
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
