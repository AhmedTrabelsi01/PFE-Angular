import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signupasstudent',
  templateUrl: './signupasstudent.component.html',
  styleUrls: ['./signupasstudent.component.css']
})
export class SignupasstudentComponent implements OnInit {
  errors: any;
  counterr=0;

  constructor(private toastr:ToastrService, private route1:Router ,private PublicDataService : PublicDataService) { }
  user:any;

  ngOnInit(): void {
  }


  userForm = new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    gender: new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    confirmation:new FormControl("",Validators.required),
   });

   get f()
   {
       return this.userForm.controls;
   }
   
 get name(){
   return this.userForm.get('name');
 }
 get email(){
   return this.userForm.get('email');
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
  
 this.PublicDataService.insertStudent(this.userForm.value).subscribe(res=>{
  this.errors=res;
  if(this.errors==null){
    this.toastr.success('Account created !');
      setTimeout(() => {this.route1.navigateByUrl('/login')  }, 1000);
    
  }else{
    this.counterr=this.errors.length

  } 
})


}
 


}
