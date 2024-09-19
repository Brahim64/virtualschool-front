import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { User } from '../../shared/User';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{


  user:User;
  userId:any;
  userToken:any;
  percentage:number=0;

  constructor(private storage:StorageService,private userService:UserService){}

  ngOnInit(): void {
    this.userId=this.storage.getUser()["id"];
    this.userToken=this.storage.getUser()["token"];
    this.userService.getProfile(this.userId,this.userToken).subscribe(user=>{
      setTimeout(()=>{this.user=user},700)
      
    })
  }
  update() {
    this.userService.updateProfile(this.userId,this.userToken,this.user).subscribe(
      (next)=>{
        
        console.log("updating user done")
      }
    )
    let interval = setInterval(()=>{
      this.percentage++;
      if (this.percentage==100) {
        clearInterval(interval)
      }
    },10)
    setTimeout(()=>{
      this.percentage=0
    },2000)
    
   
    
      

  }

  

}
