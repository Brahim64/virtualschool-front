import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { JwtService } from '../../services/jwt.service';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,MatButtonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  readonly dialog = inject(MatDialog);

  username:string;

  isStudent:boolean=false;
  isTeacher:boolean=false
  display:string="no user is logged in";
  headers:any;
  constructor(private storage:StorageService,private jwtService:JwtService,private http:HttpClient,private router:Router){

  }


  ngOnInit(): void {
    const user=this.storage.getUser()
    this.username=user['username']
    if (user) {
      if (user['authorities']=="ROLE_STUDENT") {
        console.log(user['authorities'])
        this.isStudent=true
      }
      if (user['authorities']=="ROLE_TEACHER") {
        this.isTeacher=true
      }
    }
  }
  signOut(){
    this.storage.clean();
    this.router.navigate(['login']);
  }
  ToMyCourses(){
    this.router.navigate(['home/courses/'+this.storage.getUser()['username']])
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      height: '48vh',
      width: '60vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
