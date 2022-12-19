import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { MentorDataService } from 'src/app/services/mentor-data.service';
@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrls: ['./add-history.component.css']
})
export class AddHistoryComponent implements OnInit {
  history:any;
  loggeduser!: any;
  token: any;
  role:any;
  file!: File  ; // Variable to store file
 
  error:any="";
  auth : any;
  historyForm = new FormGroup({
    name: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),

   
}); 
  constructor(private route:ActivatedRoute, private toastr: ToastrService, private PublicDataService:PublicDataService, private MentorDataService:MentorDataService) { }

  ngOnInit(): void {
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
  }



  onSubmit(){
    this.history=this.historyForm.value
    let formdata = new FormData();
    formdata.append('user_id',this.loggeduser['id'])
    formdata.append('name',this.history.name);
    formdata.append('description',this.history.description);
    formdata.append('img',this.file);
 
   this.MentorDataService.AddHistory(formdata).subscribe(res=>{
     this.error=res;
     
     if(this.error==null){
      this.toastr.success('Project Added!');
      setTimeout(() => {window.location.reload()  }, 1000);
      } 
   
 
       
  
      
  })}


  onChange(event: any) {
    this.file = event.target.files[0];
  }
}
