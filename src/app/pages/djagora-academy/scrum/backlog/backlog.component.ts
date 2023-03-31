import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
import { StudentDataService } from 'src/app/services/student-data.service';
import { ToastrService } from 'ngx-toastr';
declare function popup():any ;

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
userStory:any;
token:any;
loggeduser:any={};
auth:any;
role:any;
error:any;
imgpath: any = 'http://127.0.0.1:8000/storage/post/'//image path laravel
id:any;
scrumMaster:any={};
loader=true
form_value:any;
userStories:any=[];
students:any=[];
  constructor( private toastr:ToastrService, private StudentDataService:StudentDataService,private route:ActivatedRoute,private PublicDataService:PublicDataService) { }

  userStoryForm = new FormGroup({
    name: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    estimated_date:new FormControl("",Validators.required),
    ressource:new FormControl("",Validators.required),
    actor:new FormControl("",Validators.required),
    priority:new FormControl("",Validators.required),


});
scrumForm = new FormGroup({
  etudiant: new FormControl("",Validators.required),
  });

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.id = this.route.snapshot.params['id'];
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role=this.PublicDataService.getRole();
    this.auth=this.PublicDataService.getLoginState();
    this.getAcceptedStudents();
    this.getUserStories();
    this.getScrumMaster();
    popup()
  }


  getAcceptedStudents(){
    this.StudentDataService.GetAccStud(this.id).subscribe(res=>{
      this.students=res;
   })
  }

  getUserStories(){
    this.PublicDataService.getUserStoriesByProj(this.id).subscribe(res=>{
      this.userStories=res;
      this.loader=false
   })
  }

  onSubmit(){
    this.userStory=this.userStoryForm.value

    let formdata = new FormData();
    formdata.append('user_id',this.loggeduser['id'])
    formdata.append('project_id',this.id)
    formdata.append('name',this.userStory.name);
    formdata.append('estimated_date',this.userStory.estimated_date);
    formdata.append('priority',this.userStory.priority);
    formdata.append('description',this.userStory.description);
    formdata.append('ressource',this.userStory.ressource);
    formdata.append('actor',this.userStory.actor);

  this.PublicDataService.addUserStory(formdata).subscribe(res=>{
     this.error=res;
     if(this.error.code==200){
        this.toastr.success("user story added with success")
     }
     this.getUserStories()
  })
}

updateScrumMaster(){
  this.form_value=this.scrumForm.value

  let formdata = new FormData();
  formdata.append('master',this.form_value.etudiant)
  formdata.append('project_id',this.id)

  this.PublicDataService.updateScrumMaster(formdata).subscribe(res=>{
    window.location.reload()
 })
}

getScrumMaster(){

  this.PublicDataService.getScrumMaster(this.id).subscribe(res=>{
    this.scrumMaster=res;
 })
}
}
