import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../../../shared/course';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  teacherName:string;
  coursesList:any;
  constructor(private coursesService:CoursesService,private router:Router,private route:ActivatedRoute,
    private storage:StorageService
  ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teacherName = params.get('teacher');
    });
    this.coursesService.getAllCoursesByTeacher(this.teacherName,this.storage.getUser()['token']).subscribe(
      res=>{
        
        this.coursesList=res;
      }
    )
  }
  toFiles(courseId:number){
    this.router.navigate(['/course/'+courseId]);
    console.log("helo")
  }

}
