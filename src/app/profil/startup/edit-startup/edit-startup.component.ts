import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicDataService } from 'src/app/services/public-data.service';
import { MentorDataService } from 'src/app/services/mentor-data.service';
@Component({
  selector: 'app-edit-startup',
  templateUrl: './edit-startup.component.html',
  styleUrls: ['./edit-startup.component.css']
})
export class EditStartupComponent implements OnInit {

 
  startup:any;
  startup1:any;
  imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel
  loggeduser!: any;
  token: any;
  role:any;
  file!: File  ; // Variable to store file
 id:any;
  error:any="";
  auth : any;
  startupForm = new FormGroup({
    name: new FormControl("",Validators.required),
    description:new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),

   
}); 
  constructor(private route:Router, private route1: ActivatedRoute,private PublicDataService:PublicDataService, private MentorDataService:MentorDataService) { }

  ngOnInit(): void {
    this.id=this.route1.snapshot.params['id'];
    this.getStartupById();

    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
  }

  getStartupById(){
    this.MentorDataService.getStartupById(this.id).subscribe(res=>{
      this.startup1=res;
   
   })
  }
  onDelete(){
    this.MentorDataService.deleteStartup(this.id).subscribe(res=>{
      this.route.navigate(['/profil'])
  })
}

  onSubmit(){
    this.startup=this.startupForm.value
    let formdata = new FormData();
    formdata.append('user_id',this.loggeduser['id'])
    formdata.append('name',this.startup.name);
    formdata.append('description',this.startup.description);
    formdata.append('img',this.file);
 
   this.MentorDataService.updateStartup(this.id,formdata).subscribe(res=>{
     this.error=res;
     window.location.reload()

  
      
  })}


  onChange(event: any) {
    this.file = event.target.files[0];
  }

}
