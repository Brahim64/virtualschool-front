import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { JwtService } from '../../services/jwt.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
const BaseURL="http://localhost:8080/";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{


  display:string="no user is logged in";
  headers:any;
  constructor(private storage:StorageService,private jwtService:JwtService,private http:HttpClient){

  }

  ngOnInit(): void {
    
    //this.headers=this.jwtService.createAuthzHeader()
    /* this.studentMethod().subscribe(res=>{
      this.display=res
      console.log(this.display)
    }) */
    
  }

  studentMethod():Observable<any>{
    return this.http.get(BaseURL+"test/student",{headers:this.headers})
  }

}
