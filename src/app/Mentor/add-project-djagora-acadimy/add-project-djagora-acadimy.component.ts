import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { MentorDataService } from 'src/app/services/mentor-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-project-djagora-acadimy',
  templateUrl: './add-project-djagora-acadimy.component.html',
  styleUrls: ['./add-project-djagora-acadimy.component.css']
})
export class AddProjectDjagoraAcadimyComponent implements OnInit {
   //les constructeurs
   constructor(private toastr: ToastrService,private route:Router,private MentorDataService : MentorDataService,private PublicDataService: PublicDataService) { }
  //les declarations
  project:any= {};
  loggeduser: any={};
  token: any;
  role:any;
  file!: File  ; // Variable to store file
  loading: boolean = false; // Flag variable
  shortLink: string = "";
  error:any="";
  auth : any;
  counterr:any=0;
 
  projectForm = new FormGroup({
    name: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    estimated_date:new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),

   
}); 
get name(){
  return this.projectForm.get('name');
}
get description(){
  return this.projectForm.get('Description');
}
get img(){
  return this.projectForm.get('img');
}
get estimated_date(){
  return this.projectForm.get('estimated_date');
}
  ngOnInit(): void {
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role=this.PublicDataService.getRole();
    this.auth=this.PublicDataService.getLoginState();
  }
  
 
  onSubmit(){
   this.project=this.projectForm.value
   let formdata = new FormData();
   formdata.append('user_id',this.loggeduser['id'])
   formdata.append('name',this.project.name);
   formdata.append('description',this.project.description);
   formdata.append('estimated_date',new Date(this.project.estimated_date).toDateString());
   formdata.append('img',this.file);

  this.MentorDataService.AddProject(formdata).subscribe(res=>{
    this.error=res;
    if(this.error==null){
      this.toastr.success('Project Added!');
      setTimeout(() => {this.route.navigate(['/djagoraacadimy'])  }, 1000);
      } 

     if(this.error!=null){
      this.counterr=this.error.length;

     } 
   
 })}

 onChange(event: any) {
  this.file = event.target.files[0];
}
} 