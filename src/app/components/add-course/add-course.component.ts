import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import {  RouterLink } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [HeaderComponent,RouterModule,MatDividerModule,MatFormFieldModule,ReactiveFormsModule,MatRadioModule,MatInputModule,MatButtonModule,RouterLink, MatDialogModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit{

  myForm: FormGroup;
  token:string;
  username:string
  constructor(private fb: FormBuilder,private router:Router,private storageService:StorageService,private courseService:CoursesService
  ) {
    this.myForm = this.fb.group({
      
      title: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]]

    });
  }
  ngOnInit(): void {
    this.username=this.storageService.getUser()['username'];
  }
  onSubmit() {
    this.token=this.storageService.getUser()['token'];
    const data={
      code:this.myForm.value['code'],
      title:this.myForm.value['title'],
      teacher:this.storageService.getUser()['username']
    }
    console.log(this.token)
    console.log(data)
    this.courseService.addCourse(data,this.token).subscribe(obj=>{
      console.log("done")
    });
    this.router.navigate(['home/courses/'+this.username])
  }
}
