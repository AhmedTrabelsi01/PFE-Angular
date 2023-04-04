import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
declare function popup():any ;

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  popup()
  }
 
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  review = [
    'Take bath',
    'Wash car',
  ];
  list1:any=['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum',' a dignissim dolor malesuada.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum, a dignissim dolor malesuada.'];
  list2:any=[ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum',' a dignissim dolor malesuada.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum, a dignissim dolor malesuada.'];
  list3=[ "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum, a dignissim dolor malesuada.","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum, a dignissim dolor malesuada."];
  list4=["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum, a dignissim dolor malesuada.","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rutrum velit velerat fermentum, a dignissim dolor malesuada."];

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

}
