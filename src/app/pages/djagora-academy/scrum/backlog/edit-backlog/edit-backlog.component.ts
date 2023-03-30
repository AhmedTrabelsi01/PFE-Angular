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
  userStory:any;
  token:any;
  loggeduser:any={};
  id:any;
  students:any;
  data:any;
  loader=true;

  constructor(private toastr:ToastrService, private StudentDataService:StudentDataService,private route:ActivatedRoute,
    private router: Router,private PublicDataService:PublicDataService) { }

  userStoryForm = new FormGroup({
    name: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    estimated_date:new FormControl("",Validators.required),
    ressource:new FormControl("",Validators.required),
    actor:new FormControl("",Validators.required),
    priority:new FormControl("",Validators.required),
  });
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserSotryByID();
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.getAcceptedStudents();
  }

  getUserSotryByID(){
    this.PublicDataService.getUserStoryById(this.id).subscribe(res => {
      this.data=res;
      this.userStory=this.data;
      this.loader=false;
    });
  }
  editUserStory(){
    this.userStory=this.userStoryForm.value;
    let formdata = new FormData;
    formdata.append('id_userStory',this.userStory.id_userstory);
    formdata.append('user_id',this.loggeduser['id'])
    formdata.append('name',this.userStory.name);
    formdata.append('estimated_date',this.userStory.estimated_date);
    formdata.append('priority',this.userStory.priority);
    formdata.append('description',this.userStory.description);
    formdata.append('ressource',this.userStory.ressource);
    formdata.append('actor',this.userStory.actor);
    console.log(this.userStory);
    this.PublicDataService.updateUserStory(formdata).subscribe(res => {
      this.router.navigateByUrl('/backlog/'+this.id);
    })
  }

  getAcceptedStudents(){
    this.StudentDataService.GetAccStud(this.id).subscribe(res=>{
      this.students=res;
   })
  }

}
