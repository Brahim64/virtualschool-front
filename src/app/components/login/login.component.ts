import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { loginRequest } from '../../shared/LoginRequest';
import { Router, RouterLink } from '@angular/router';






@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatGridListModule,MatIconModule,MatToolbarModule,
    MatFormFieldModule,ReactiveFormsModule,MatRadioModule,MatInputModule,MatButtonModule,RouterLink]
    ,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  myForm: FormGroup;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private fb: FormBuilder,private authService:AuthService,private storageService:StorageService,
    private router:Router
  ) {
    this.myForm = this.fb.group({
      
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required,Validators.minLength(3)]]

    });
  }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['home'])
    }
  }
  onSubmit(){
    const username=this.myForm.value['username']
    const password=this.myForm.value['password']
    this.authService.login(new loginRequest(username,password)).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        console.log(username,password)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.enterHome()
        console.log(data)
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(this.errorMessage)
      }
    })
  }
  enterHome(): void {
    this.router.navigate(["/home"]);
  }
}
