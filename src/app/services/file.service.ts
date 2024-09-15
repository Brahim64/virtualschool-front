import { Injectable } from '@angular/core';
import { Files } from '../shared/files';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';


const BaseURL='http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

    upload(file: File,courseId:string,token:string): Observable<HttpEvent<any>> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        })
      };
      const url=BaseURL
      const formData: FormData = new FormData();

      formData.append('file', file);
      formData.append('courseId',courseId)

      const req = new HttpRequest('POST', `${BaseURL}/file/upload`, formData, httpOptions); 
      return this.http.request(req);
      //return this.http.post(`${BaseURL}/file/upload`,formData,httpOptions);
    }

    getFiles(token:string): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + token
        })
      };
      const url=BaseURL
      return this.http.get(`${BaseURL}/file/files`,httpOptions);
    }

    getFile(token:string,id:number):Observable<Blob> {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/octet-stream'
        });
        return this.http.get(`${BaseURL}/file/files/${id}`, { headers: headers, responseType: 'blob' });
    }
}

