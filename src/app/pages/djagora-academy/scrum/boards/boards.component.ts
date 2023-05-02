import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare function popup():any ;

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  affected: any = [];
  list1: any = [];
  list2: any = [];
  list3: any = [];
  list4: any = [];
  data: any = [];

  newAffected: any = [];
  newList1: any = [];
  newList2: any = [];
  newList3: any = [];
  newList4: any = [];


sprint:any={}
  id: any
  loader = true
  token: any;
  loggeduser: any = {};
  auth: any;
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'
  role: any;
  constructor(private PublicDataService: PublicDataService, private route: ActivatedRoute, private toastr:ToastrService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.id = this.route.snapshot.params['id'];
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role = this.PublicDataService.getRole();
    this.auth = this.PublicDataService.getLoginState();
    this.getBoardUserstories();
    this.getSprintById();
    this.getIdeas();
    //popup()
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.newAffected = [];
      this.newList1 = [];
      this.newList2 = [];
      this.newList3 = [];
      this.newList4 = [];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.affected.forEach((element: any) => {
        this.newAffected.push(element)
      });
      this.list1.forEach((element: any) => {
        this.newList1.push(element)
      });

      this.list2.forEach((element: any) => {
        this.newList2.push(element)
      });
      this.list3.forEach((element: any) => {
        this.newList3.push(element)
      });
      this.list4.forEach((element: any) => {
        this.newList4.push(element)
      });
      let formdata = new FormData();
      formdata.append('todo', JSON.stringify(this.newList1))
      formdata.append('inprogress', JSON.stringify(this.newList2))
      formdata.append('inreview', JSON.stringify(this.newList3))
      formdata.append('completed', JSON.stringify(this.newList4))
      formdata.append('affected', JSON.stringify(this.newAffected))
      formdata.append('id', this.id)


      this.PublicDataService.updateBoard(formdata).subscribe(res => {
      })

    }
  }

  getBoardUserstories() {
    this.PublicDataService.getUserStoryByBoard(this.id).subscribe(res => {
      this.data = res;
      this.list1 = this.data.todo;
      this.list2 = this.data.inprogress;
      this.list3 = this.data.inreview;
      this.list4 = this.data.completed;
      this.affected = this.data.affected;
      this.loader = false
    })
  }

  getSprintById(){
    this.PublicDataService.getSprintByID(this.id).subscribe(res=>{
      this.sprint=res;
    
   })
  }

  /********************** Idea functions and variables ***************************/
  ideaForm = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  })
  idea:any;
  projectID:any;
  error:any;
  submitted=false;
  ideas:any;
  count=0;

  getIdeas(){
    this.PublicDataService.getIdeas(this.id).subscribe(res => {
      this.ideas=res;
      this.count = this.ideas.length;
    });
  }
  addIdea(){
    this.idea = this.ideaForm.value;
    this.submitted=true;
    
    let formdata2 = new FormData();
    formdata2.append('user_id',this.loggeduser['id']);
    formdata2.append('name',this.idea.name);
    formdata2.append('description',this.idea.description);
    formdata2.append('actor',this.loggeduser['name']);
    formdata2.append('sprint_id',this.id);
    this.PublicDataService.addIdea(formdata2).subscribe(res=> {this.error=res
      if(this.error.code==200){
         this.toastr.success("Idea added with success");
         this.getIdeas();
      }
   })
  }
  deleteIdea(id:any){
    this.PublicDataService.deleteIdea(id).subscribe(res => {
      this.getIdeas();
    })
  }
}
