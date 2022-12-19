import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService,View, EventSettingsModel  } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-edit-profil',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],

  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  singleuser:any;
  file: any;
  constructor(private PublicDataService:PublicDataService,private route1: ActivatedRoute) { }
data: any;
user!:any;
id:any;
auth: any;
loggeduser: any;
token: any;
projects:any;
applications:any;
role:any;
imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel




public showWeekend: boolean = false;


public data1: object [] = [{
  id: 2,
  eventName: 'Meeting',
  startTime: new Date(2018, 1, 15, 10, 0),
  endTime: new Date(2018, 1, 15, 12, 30),
  isAllDay: false
    }];
    public selectedDate: Date = new Date(2018, 1, 15);
    public eventSettings: EventSettingsModel = {
  dataSource: this.data1,
  fields: {
    id: 'id',
    subject: { name: 'eventName' },
    isAllDay: { name: 'isAllDay' },
    startTime: { name: 'startTime' },
    endTime: { name: 'endTime' },
  }
    };
public currentView: View = 'Month';












  ngOnInit(): void {
    this.id=this.route1.snapshot.params['id'];
    this.token = this.PublicDataService.getToken();
      this.loggeduser = this.PublicDataService.getUser(this.token);
      this.role = this.PublicDataService.getRole();
      this.getUserById();
      if(this.role=='1'){
        this.GetOwnedApplications();
      }
      if(this.role!='1'){
  
        this.GetOwnedProjects();
      }
  
  }


  userForm = new FormGroup({
    name: new FormControl("",Validators.required),
    birth_date:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),
    location:new FormControl("",Validators.required),
    domain:new FormControl("",Validators.required),
    profession:new FormControl("",Validators.required),
    linkedin:new FormControl("",Validators.required),   
});


  getUserById(){
    this.PublicDataService.getUserById(this.id).subscribe(res=>{
      this.data=res;
      this.user=this.data
  
    })
  
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }
  
  onEdit(){
    this.singleuser=this.userForm.value
    let formdata = new FormData();
    formdata.append('img',this.file);
    formdata.append('name',this.singleuser.name);
    formdata.append('email',this.singleuser.email);
    formdata.append('domain',this.singleuser.domain);
    formdata.append('profession',this.singleuser.profession);
    formdata.append('linkedin',this.singleuser.linkedin);
    formdata.append('location',this.singleuser.location);
    formdata.append('birth_date',new Date(this.singleuser.birth_date).toDateString());
        
      this.PublicDataService.updateProfilData(this.id,formdata).subscribe(res=>{  
        window.location.reload()
      })
  
    
  }












  
  GetOwnedProjects(){
    this.PublicDataService.GetOwnedProjects(this.id).subscribe(res=>{
      this.projects=res;
    }
      )
  }

  GetOwnedApplications(){
    this.PublicDataService.GetOwnedApplications(this.id).subscribe(res=>{
      this.applications=res;
    }
      )
  }

 
  onDeleteApp(idapp:any){
       this.PublicDataService.deleteApplication(idapp).subscribe(res=>{
        }
      )

  }
  
  onDeletepro(idproj:any){
    this.PublicDataService.deleteProject(idproj).subscribe(res=>{
    })

  }
}
