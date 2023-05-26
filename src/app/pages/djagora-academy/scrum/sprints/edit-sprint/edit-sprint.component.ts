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
evaluationSprint1:any
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

  valueSprint1:any;


  valueSprint2:any;
  //---------Évaluation Sprint functions------------

  //---evalution
  evaluation1(){
    this.PublicDataService.evaluationSprint1(this.id).subscribe(res => {
      this.evaluationSprint1 = res;
      this.loader=false

    })
  }

  evaluation2(){
    this.PublicDataService.evaluationSprint2(this.id).subscribe(res => {
      this.evaluationSprint1 = res;
      this.loader=false

    })
  }
  allmoy:any;
  evaluation3(){
    this.PublicDataService.evaluationSprint3(this.id).subscribe(res => {
      this.evaluationSprint1 = res;
      this.moy1=this.evaluationSprint1.moy1
      this.moy2=this.evaluationSprint1.moy2
      this.moy3=this.evaluationSprint1.moy3
      this.allmoy=this.evaluationSprint1.moy
      this.evaluationSprint1=this.evaluationSprint1.evaluation
      this.loader=false


    })
  }
  moy1:any
  moy3:any
  moy2:any;
  evaluation4(){
    this.PublicDataService.evaluationSprint4(this.id).subscribe(res => {
      this.evaluationSprint1 = res;
      this.moy1=this.evaluationSprint1.moy
      this.evaluationSprint1=this.evaluationSprint1.evaluation
      this.loader=false

    })
  }

  evaluation5(){
    this.PublicDataService.evaluationSprint5(this.id).subscribe(res => {
      this.evaluationSprint1 = res;
      this.loader=false

    })
  }

  evaluation6(){
    this.PublicDataService.evaluationSprint6(this.id).subscribe(res => {
      this.evaluationSprint1 = res;
      this.loader=false

    })
  }




  //---get sprint by id

  getSprintById(){
    this.PublicDataService.getSprintByID(this.id).subscribe(res=>{
      this.sprint=res;
      if(this.sprint.state==1){
        if(this.sprint.name=='sprint 1'){this.evaluation1()}
        if(this.sprint.name=='sprint 2'){this.evaluation2()}
        if(this.sprint.name=='sprint 3'){this.evaluation3()}
        if(this.sprint.name=='sprint 4'){this.evaluation4()}
        if(this.sprint.name=='sprint 5'){this.evaluation5()}
        if(this.sprint.name=='sprint 6'){this.evaluation6()}
      }else{
        this.loader=false
      }

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
