import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { MentorDataService } from 'src/app/services/mentor-data.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-project-djagora-acadimy',
  templateUrl: './add-project-djagora-acadimy.component.html',
  styleUrls: ['./add-project-djagora-acadimy.component.css']
})
export class AddProjectDjagoraAcadimyComponent implements OnInit {
   //les constructeurs
   constructor(private toastr: ToastrService,private route:Router,private MentorDataService : MentorDataService,private PublicDataService: PublicDataService,private http:HttpClient) { }
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
  loader:any=true
  projectForm = new FormGroup({
    title: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    technologies:new FormControl("",Validators.required),
    nb_stagaires:new FormControl("",Validators.required),
    domain:new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),


});

  ngOnInit(): void {
    window.scroll(0,0)
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role=this.PublicDataService.getRole();
    this.auth=this.PublicDataService.getLoginState();

  }


  onSubmit(){
   this.project=this.projectForm.value

   let formdata = new FormData();
   formdata.append('user_id',this.loggeduser['id'])
   formdata.append('title',this.project.title);
   formdata.append('technologies',JSON.stringify(this.project.technologies) );
   formdata.append('domain',this.project.domain);
   formdata.append('nb_stagaires',this.project.nb_stagaires);
   formdata.append('description',this.project.description);
   formdata.append('img',this.file);
  this.MentorDataService.AddProject(formdata).subscribe(res=>{
    this.error=res;
    if(this.error==null){
      this.toastr.success('Project Added');
      setTimeout(() => {this.route.navigate(['/djagoraacadimy'])  }, 1000);
     
      }
     if(this.error.message){
      this.toastr.error(this.error.message);
     }

     if(this.error!=null){
      this.counterr=this.error.length;
     }

 })}

 onChange(event: any) {
  this.file = event.target.files[0];
}














// defined the array of data
    public data: Object[] = ['angular', 'laravel', 'machine learning', 'artificial intelligence'];
    // set placeholder text to MultiSelect input element
    public text: string = 'Select a technology';










}
