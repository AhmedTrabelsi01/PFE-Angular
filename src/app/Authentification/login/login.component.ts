import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: any;
  counterr=0;

  constructor(private route1: Router, private PublicDataService: PublicDataService) { }
  user: any;
  loggedUser: any;
  token: any;

  ngOnInit(): void {
  }
  LoginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

 
  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
  }

  
  onLogin() {



    this.PublicDataService.loginUser(this.LoginForm.value).subscribe(res => {
      this.token = res;
      if (this.token.token) {
        this.auth = this.PublicDataService.setLoginState();
        this.PublicDataService.setToken(this.token.token);
        this.route1.navigateByUrl('');
              
      }
      if(this.token.message){
        this.counterr=1
      }
      
    })


  }
 


}




