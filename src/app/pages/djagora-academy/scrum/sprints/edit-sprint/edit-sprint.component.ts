import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-sprint',
  templateUrl: './edit-sprint.component.html',
  styleUrls: ['./edit-sprint.component.css']
})
export class EditSprintComponent implements OnInit {
  userStories:any=[];
  id:any
loader=true
token:any;
loggeduser:any={};
auth:any;
role:any;
sprint:any={}
newSprint:any={}
imgpath: any = 'http://127.0.0.1:8000/storage/post/'//image path laravel
scrumMaster:any={};
error:any=[];
newAffectedData:any=[];
newUserStories:any=[];
affected:any = [];

  constructor(private toastr:ToastrService, private route:ActivatedRoute, private PublicDataService:PublicDataService) { }
  SprintForm = new FormGroup({
    name: new FormControl("",Validators.required),
    start_date:new FormControl("",Validators.required),
    end_date:new FormControl("",Validators.required),


});


  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.newAffectedData=[]
      this.newUserStories=[]

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.affected.forEach((element: any) => {
        this.newAffectedData.push(element)
      });
      this.userStories.forEach((element: any) => {
        this.newUserStories.push(element)
      });

      let formdata = new FormData();
      formdata.append('stories',JSON.stringify(this.newUserStories) )
      formdata.append('affected',JSON.stringify(this.newAffectedData) )
      formdata.append('id',this.sprint.id )


      this.PublicDataService.updateData(formdata).subscribe(res=>{
     })

    }



  }
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.id = this.route.snapshot.params['id'];
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role=this.PublicDataService.getRole();
    this.auth=this.PublicDataService.getLoginState();
    this.getSprintById();

  }

  /***************************** Pour l'évaluation *********************************/
  statForm = new FormGroup({
    duree: new FormControl("",Validators.required),
  });
  valueSprint1:any;

  statForm2= new FormGroup({
    totalUsers: new FormControl("",Validators.required),
    earlyAdopters: new FormControl("",Validators.required),
    coCreator:  new FormControl("",Validators.required),
    hypothesis: new FormControl("",Validators.required),
  })
  valueSprint2:any;
  //---------Évaluation Sprint functions------------
  //Function 1
  submitSprint1(){
    this.valueSprint1=this.statForm.value;
    let formdata = new FormData();
    formdata.append('duree',this.valueSprint1.duree );
    this.PublicDataService.submitSprint1(formdata).subscribe(res=>{
      
    
    });
  }

//Function 2
submitSprint2(){
  this.valueSprint2 = this.statForm2.value;
  let formdata = new FormData();
  formdata.append('totalUsers',this.valueSprint2.totalUsers);
  formdata.append('earlyAdopters',this.valueSprint2.earlyAdopters);
  formdata.append('coCreator',this.valueSprint2.coCreator);
  formdata.append('hypothesis',this.valueSprint2.hypothesis);
  this.PublicDataService.submitSprint2(formdata).subscribe(res =>{

  });
}
  //---get sprint by id

  getSprintById(){
    this.PublicDataService.getSprintByID(this.id).subscribe(res=>{
      this.sprint=res;
      this. getProjectById() ;
      this.getScrumMaster();
      this.getUserStories();
      this.getAffectedUserStories();

   })
  }
  SingleProject:any
  getProjectById() {
    this.PublicDataService.getProjectById(this.sprint.project_id).subscribe(res => {
      this.SingleProject = res;
    })}


  getUserStories(){
    this.PublicDataService.getUserStories(this.sprint.project_id).subscribe(res=>{
      this.userStories=res;
   })
  }

  getAffectedUserStories(){
    this.PublicDataService.getAffUserStories(this.sprint.id).subscribe(res=>{
      this.affected=res;
      this.loader=false
   })
  }


  /* editSprint(){
    this.newSprint=this.SprintForm.value

    let formdata = new FormData();
    formdata.append('id',this.sprint.id)
    formdata.append('end_date',this.newSprint.end_date)
    formdata.append('start_date',this.newSprint.start_date)
    formdata.append('name',this.newSprint.name);
    this.PublicDataService.updateSprint(formdata).subscribe(res=>{
    this.error=res;
    if(this.error.code==200){
      this.toastr.success("Sprint updated with success")
    }
   })
  }*/

  getScrumMaster(){

    this.PublicDataService.getSprintScrumMaster(this.id).subscribe(res=>{
      this.scrumMaster=res;
   })
  }

  
}
