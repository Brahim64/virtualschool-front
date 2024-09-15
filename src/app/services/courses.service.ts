import { Injectable } from '@angular/core';
import { Course } from '../shared/course';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseRequest } from '../shared/courseRequest';
const BaseURL='http://localhost:8080/course/';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }

  addCourse(course:CourseRequest,token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post<CourseRequest>(BaseURL+'add',course,httpOptions);
  
  }
  getAllCoursesByTeacher(teacherName:string,token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      })
    };
    const url=BaseURL+'all/'+teacherName;
    console.log(url)
    return this.http.get<string>(url,httpOptions);
  }

  getAllCourses():Course[]{
    return [
      {id:1,
        title:"java",
        code:"abc",
        teacher:"bahe"
      },
      {id:2,
        title:"angular",
        code:"def",
        teacher:"brahim"
      },
      {id:3,
        title:"react",
        code:"123",
        teacher:"username"
      },
    ];
  }
}
