import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicDataService } from 'src/app/services/public-data.service';
import { StudentDataService } from 'src/app/services/student-data.service';

@Component({
  selector: 'app-edit-backlog',
  templateUrl: './edit-backlog.component.html',
  styleUrls: ['./edit-backlog.component.css']
})
export class EditBacklogComponent implements OnInit {

  //Declaration des variables
  userStory:any={};
  token:any;
  loggeduser:any={};
  id:any;
  students:any;
  data:any;
  loader=true;
  projID:any;

  constructor(private toastr:ToastrService, private StudentDataService:StudentDataService,private route:ActivatedRoute,
    private router: Router,private PublicDataService:PublicDataService) { }

  userStoryForm = new FormGroup({
    name: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    hours:new FormControl("",Validators.required),
    realized_date:new FormControl("",Validators.required),
    resource:new FormControl("",Validators.required),
    actor:new FormControl("",Validators.required),
    priority:new FormControl("",Validators.required),
  });
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserSotryByID();
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
  }

  getUserSotryByID(){
    this.PublicDataService.getUserStoryById(this.id).subscribe(res => {
      this.data=res;
      this.userStory=this.data;
      this.projID=this.userStory.project_id
      this.loader=false;
      this.getAcceptedStudents();

    });
  }
  editUserStory(){
    this.userStory=this.userStoryForm.value;
    let formdata = new FormData;
    formdata.append('id',this.id);
    formdata.append('user_id',this.loggeduser['id'])
    formdata.append('name',this.userStory.name);
    formdata.append('hours',this.userStory.hours);
    formdata.append('realized_date',this.userStory.realized_date);
    formdata.append('priority',this.userStory.priority);
    formdata.append('description',this.userStory.description);
    formdata.append('resource',this.userStory.resource);
    formdata.append('actor',this.userStory.actor);
    this.PublicDataService.updateUserStory(formdata).subscribe(res => {
      this.toastr.success("User story updated with success")
      this.router.navigateByUrl('/backlog/'+this.projID);
    })
  }

  getAcceptedStudents(){
    this.StudentDataService.GetAccStud(this.userStory.project_id).subscribe(res=>{
      this.students=res;
   })
  }

}
