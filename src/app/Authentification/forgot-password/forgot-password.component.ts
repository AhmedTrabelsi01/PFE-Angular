import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loggeduser:any;
  id:any
  mail:any;
  state:any
  constructor(private route1:Router ,private PublicDataService : PublicDataService) { }
 
  ngOnInit(): void {
  }
  resetForm = new FormGroup({
    email: new FormControl("",Validators.required),
   });


   onVerif(){
     this.mail=this.resetForm.value.email
    let formdata = new FormData();
    formdata.append('email',this.mail);
    this.PublicDataService.resPassword(formdata).subscribe(res=>{
      this.state=res
      this.route1.navigateByUrl('/login');
   })

  }


}


