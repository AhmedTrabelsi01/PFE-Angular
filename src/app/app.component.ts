import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentDataService } from './services/student-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularProjectPfA';
  file: any;
  gender: any;

  constructor(public router: Router,public StudentDataService:StudentDataService){
  }

  genderForm = new FormGroup({
    name: new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),  
}); 
onChange(event: any) {
  this.file = event.target.files[0];
}

onsubmit(){
  this.gender=this.genderForm.value
  let formdata =new FormData();
  formdata.append('img',this.file)
  formdata.append('name',this.gender.name)

  this.StudentDataService.autofill(formdata).subscribe(res=>{

});

}
}
