import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private storage:StorageService) { }

  public createAuthzHeader(){
    const jwt=this.storage.getUser()["token"];
    console.log(jwt)
    if (jwt) {
      return new HttpHeaders().set(
        "Authorization","Bearer "+jwt
      )
    }else{
      console.log('token not found in the local storage');
    }
    return null
  }

  
}
