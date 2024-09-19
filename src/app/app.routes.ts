import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/home/courses/courses.component';
import { CourseFilesComponent } from './components/course-files/course-files.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"register",component:SignupComponent},
    {path:"login",component:LoginComponent},
    {path:"home",component:HomeComponent,
        children:[
            {path:"profile",component:ProfileComponent},
            {path:"courses/:teacher",component:CoursesComponent}
        ]
    },
    {path:"course/:id",component:CourseFilesComponent},
    {path:"createcourse",component:AddCourseComponent},
    {path:"profile",component:ProfileComponent}
];
