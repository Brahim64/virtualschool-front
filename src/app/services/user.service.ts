import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from '../shared/User';


const API_URL = 'http://localhost:8080/profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  

  getProfile(id:number,token:string): Observable<User> {
    
    
      const headers= new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
      
  
    
    const profileRequest={"id":id}
    return this.http.post<User>(API_URL,profileRequest,{headers});
  }
  updateProfile(id:number,token:string,updateRequest:User){
    const headers= new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    const profileRequest={"id":id}
    return this.http.patch(API_URL+'/'+id,updateRequest,{headers})
  }

}
