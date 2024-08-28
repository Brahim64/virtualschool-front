import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { JwtService } from '../../services/jwt.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const BaseURL="http://localhost:8080/";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  display:string="no user is logged in";
  headers:any;
  constructor(private storage:StorageService,private jwtService:JwtService,private http:HttpClient){}

  ngOnInit(): void {
    if (this.storage.getUser) {
      this.display=this.storage.getUser()
    }
    this.headers=this.jwtService.createAuthzHeader()
    this.studentMethod().subscribe(res=>{
      this.display=res
      console.log(this.display)
    })
    
  }

  studentMethod():Observable<any>{
    return this.http.get(BaseURL+"test/all",{headers:this.headers})
  }

}
