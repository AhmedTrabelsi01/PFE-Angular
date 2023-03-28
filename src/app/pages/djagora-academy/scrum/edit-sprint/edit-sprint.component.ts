import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private route:ActivatedRoute, private PublicDataService:PublicDataService) { }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
  
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
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
      console.log(this.sprint)
      this.loader=false
      this.getUserStories();

   })
  }


  getUserStories(){
    this.PublicDataService.getUserStories(this.sprint.id).subscribe(res=>{
      this.userStories=res;
      this.loader=false
   })
  }

}
