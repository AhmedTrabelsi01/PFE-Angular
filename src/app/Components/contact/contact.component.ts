import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact: any;
  errors: any;
  counterr=0;

  constructor(private toastr:ToastrService, private route1:Router ,private PublicDataService : PublicDataService) { }



  ngOnInit(): void {
  }


  contactForm = new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    phone: new FormControl("",Validators.required),
    state: new FormControl("",Validators.required),
    description: new FormControl("",Validators.required),

  })

 
onSubmit(){

  this.PublicDataService.insertContact(this.contactForm.value).subscribe(res=>{
    this.errors=res;

    if(this.errors==null){
      this.toastr.success('Message Submitted !');
        setTimeout(() => {window.location.reload()}, 1000);
      
    }else{
      this.counterr=this.errors.length
  
    }
})


}


}