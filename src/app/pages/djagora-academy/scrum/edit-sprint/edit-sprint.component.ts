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
sprint:any={}
newSprint:any={}
error:any=[];
newAffectedData:any=[];
newUserStories:any=[];

  constructor(private toastr:ToastrService, private route:ActivatedRoute, private PublicDataService:PublicDataService) { }
  SprintForm = new FormGroup({
    name: new FormControl("",Validators.required),
    start_date:new FormControl("",Validators.required),
    end_date:new FormControl("",Validators.required),
   

});

  affected:any = [];

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
    this.getSprintById();

  }


  getSprintById(){
    this.PublicDataService.getSprintByID(this.id).subscribe(res=>{
      this.sprint=res;
      this.getUserStories();
      this.getAffectedUserStories();

   })
  }


  getUserStories(){
    this.PublicDataService.getUserStories(this.sprint.project_id).subscribe(res=>{
      this.userStories=res;
      this.loader=false
   })
  }

  getAffectedUserStories(){
    this.PublicDataService.getAffUserStories(this.sprint.id).subscribe(res=>{
      this.affected=res;
      this.loader=false
   })
  }


  editSprint(){
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
  }

}
