import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signupasmentor',
  templateUrl: './signupasmentor.component.html',
  styleUrls: ['./signupasmentor.component.css']
})
export class SignupasmentorComponent implements OnInit {

  constructor(private toastr:ToastrService, private route1:Router ,private PublicDataService : PublicDataService) { }
user:any;
errors:any;
counterr=0
  ngOnInit(): void {

  }
  userForm = new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    role: new FormControl("",Validators.required),
    gender: new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    confirmation:new FormControl("",Validators.required),
   });


 get name(){
   return this.userForm.get('name');
 }
 get email(){
   return this.userForm.get('email');
 }
 get role(){
  return this.userForm.get('role');
}
get gender(){
  return this.userForm.get('gender');
}
 get password(){
   return this.userForm.get('password');
 }
 get confirmation(){
   return this.userForm.get('confirmation');
 }


 onSubmit(){
this.user=this.userForm.value

this.PublicDataService.insertMentor(this.user).subscribe(res=>{
  this.errors=res;
  if(this.errors==null){
    this.toastr.success('Account created');
      setTimeout(() => {this.route1.navigateByUrl('/Authentification')  }, 1000);

  }else{
    this.counterr=this.errors.length

  }


})


}



}

