import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { StudentDataService } from 'src/app/services/student-data.service';
import { ToastrService } from 'ngx-toastr';
import { MentorDataService } from 'src/app/services/mentor-data.service';
@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.css']
})
export class EditWorkComponent implements OnInit {
     //les constructeurs
     constructor(private StudentDataService: StudentDataService,private route: ActivatedRoute,private toastr: ToastrService,private route1:Router,private MentorDataService : MentorDataService,private PublicDataService: PublicDataService) { }
     //les declarations
     project:any={};
     loggeduser: any={};
     postulation: any={};
     token: any;
     role:any;
     file!: File  ; // Variable to store file
     loading: boolean = false; // Flag variable
     shortLink: string = "";
     error:any="";
     auth : any;
     id:any;
     proj:any={};
     app:any={};
     filename:string | undefined;
     imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel


     PostulationtForm = new FormGroup({
      name: new FormControl("", Validators.required),
      family_name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      number: new FormControl("", Validators.required),
      cv: new FormControl("", Validators.required),
  
    })
    
     projectForm = new FormGroup({
       name: new FormControl("",Validators.required),
       description:new FormControl("",Validators.required),
       img:new FormControl("",Validators.required),
       date:new FormControl("",Validators.required),
   
      
   }); 


  ngOnInit(): void {
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role=this.PublicDataService.getRole();
    this.auth=this.PublicDataService.getLoginState();
    if(this.role=='1'){
      this.GetOwnedApplicationsByID();
    }
    if(this.role!='1'){
      this.GetOwnedProjectsByID();
    }
  }


  

  GetOwnedApplicationsByID(){
    this.id=this.route.snapshot.params['id'];
    this.StudentDataService.GetApplicationByID(this.id).subscribe(res=>{
       this.app=res;
       console.log(this.app)

    })
 

  }

  GetOwnedProjectsByID(){
    this.id=this.route.snapshot.params['id'];
    this.MentorDataService.GetProjectByID(this.id).subscribe(res=>{
      this.proj=res;

   })

  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }



  onSubmitProject(projid:any){
    this.project=this.projectForm.value
    let formdata = new FormData();
    formdata.append('img',this.file);
    formdata.append('name',this.project.name);
    formdata.append('description',this.project.description);
    formdata.append('estimated_date',new Date(this.project.date).toDateString());
    
 
   this.MentorDataService.updateProj(projid,formdata).subscribe(res=>{
     this.error=res;
     window.location.reload()

  
      
  })

}
onSubmitApp(appid:any) {
  this.postulation = this.PostulationtForm.value
  let formdata = new FormData();
 
  formdata.append('cv',this.file);
  formdata.append('name',this.postulation.name);
  formdata.append('email',this.postulation.email);
  formdata.append('family_name',this.postulation.family_name);
  formdata.append('number',this.postulation.number);



 this.StudentDataService.updateApplication(appid,formdata).subscribe(res => {
    this.error = res;
    window.location.reload()



  })

}

onDeleteApp(idapp:any){
  this.PublicDataService.deleteApplication(idapp).subscribe(res=>{
   }
 )

}

onDeletepro(idproj:any){
this.PublicDataService.deleteProject(idproj).subscribe(res=>{
})

}




}



