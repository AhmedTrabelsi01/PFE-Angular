import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { MentorDataService } from 'src/app/services/mentor-data.service';
@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.css']
})
export class EditHistoryComponent implements OnInit {

  history:any;
  history1:any;
  imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel
  loggeduser!: any;
  token: any;
  role:any;
  file!: File  ; // Variable to store file
 id:any;
  error:any="";
  auth : any;
  historyForm = new FormGroup({
    name: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),

   
}); 
  constructor(private route1: ActivatedRoute,private PublicDataService:PublicDataService, private MentorDataService:MentorDataService) { }

  ngOnInit(): void {
    this.id=this.route1.snapshot.params['id'];
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.getHistoryById();

  }

  getHistoryById(){
    this.MentorDataService.getHistById(this.id).subscribe(res=>{
      this.history1=res;
   
   })
  }


  onDelete(){
    this.MentorDataService.deleteHistory(this.id).subscribe(res=>{
      window.location.reload()
   })

  }
  onSubmit(){
    this.history=this.historyForm.value
    let formdata = new FormData();
    formdata.append('user_id',this.loggeduser['id'])
    formdata.append('name',this.history.name);
    formdata.append('description',this.history.description);
    formdata.append('img',this.file);
 
   this.MentorDataService.updateHistory(this.id,formdata).subscribe(res=>{
     this.error=res;
     window.location.reload()

  
      
  })}


  onChange(event: any) {
    this.file = event.target.files[0];
  }
}
