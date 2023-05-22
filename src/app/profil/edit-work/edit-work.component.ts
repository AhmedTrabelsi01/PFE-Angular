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
     datas1:any=[]
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
       title: new FormControl("",Validators.required),
       technologies:new FormControl("",Validators.required),
       img:new FormControl("",Validators.required),
       nb_stagaires:new FormControl("",Validators.required),
       description:new FormControl("",Validators.required),
       domain:new FormControl("",Validators.required),


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

    },(error) => {
      if(error.status==401){
        this.route1.navigate (['accessdenied'])
      };
    })


  }

  GetOwnedProjectsByID(){
    this.id=this.route.snapshot.params['id'];
    this.MentorDataService.GetProjectByID(this.id).subscribe(res=>{
      this.proj=res;
      this.datas1 = this.proj.technologies;
      this.datas1 = JSON.parse(this.datas1)
   },(error) => {
    if(error.status==401){
      this.route1.navigate (['accessdenied'])
    };
  })

  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }



  onSubmitProject(){
    this.project=this.projectForm.value
    let formdata = new FormData();
    formdata.append('img',this.file);
    formdata.append('title',this.project.title);
    formdata.append('description',this.project.description);
    formdata.append('nb_stagaires',this.project.nb_stagaires);
    formdata.append('domain',this.project.domain);
    formdata.append('technologies',JSON.stringify(this.project.technologies));
   this.MentorDataService.updateProj(this.id,formdata).subscribe(res=>{
     this.error=res;
    if(this.error==null){
      this.toastr.success("Project updated")
    }
  },(error) => {
    if(error.status==401){
      this.toastr.error("Access denied")
    };
  })

}
onSubmitApp(appid:any) {
  this.postulation = this.PostulationtForm.value
  let formdata = new FormData();

  formdata.append('cv',this.file);
  formdata.append('email',this.postulation.email);
  formdata.append('number',this.postulation.number);
  formdata.append('user_id',this.loggeduser['id']);




 this.StudentDataService.updateApplication(this.id,formdata).subscribe(res => {
    this.error = res;
    
    if(this.error==null){
      this.toastr.success("Application updated")
    }


  },(error) => {
    if(error.status==401){
      this.toastr.error("Access denied")
    };
  })

}

onDeleteApp(idapp:any){
  this.PublicDataService.deleteApplication(idapp).subscribe(res=>{
   },(error) => {
    if(error.status==401){
      this.toastr.error("Access denied")
    };
  }
 )

}

onDeletepro(idproj:any){
this.PublicDataService.deleteProject(idproj).subscribe(res=>{
},(error) => {
  if(error.status==401){
    this.toastr.error("Access denied")
  };
})

}



  // defined the array of data
  public datas: Object[] = ['angular', 'laravel', 'machine learning', 'artificial intelligence'];
  // set placeholder text to MultiSelect input element
  public text: string = 'Select a technology';




}



