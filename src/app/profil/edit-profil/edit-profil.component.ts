import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { MentorDataService } from 'src/app/services/mentor-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
declare function popup(): any;

@Component({
  selector: 'app-edit-profil',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],

  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  singleuser:any;
  file: any;
  cv:any
  constructor(private PublicDataService:PublicDataService,private MentorDataService:MentorDataService,private route1: ActivatedRoute) { }
data: any;
user:any={};
id:any;
auth: any;
loggeduser: any={};
token: any;
projects:any=[];
applications:any=[];
role:any;
meets:any=[];

imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel





public url: any = "http://127.0.0.1:8000/api/getMeetByUser/ "+ this.route1.snapshot.params['id'] ;
 public currentDate!: Date;
 public setView: View = 'Month';
 title = 'Calendar';
 public setDate: Date = new Date();
 //end variable calender


 //function calender
private dataManager: DataManager = new DataManager({
  url: this.url,
  adaptor: new UrlAdaptor,
  crossDomain: true,

});
public eventSettings: EventSettingsModel = {
  dataSource: this.dataManager

};
//end function calaender


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
  popup();
  }

//-----------form groups
  userForm = new FormGroup({
    name: new FormControl("",Validators.required),
    birth_date:new FormControl("",Validators.required),
    email:new FormControl("",Validators.required),
    img:new FormControl("",Validators.required),
    location:new FormControl("",Validators.required),
    domain:new FormControl("",Validators.required),
    profession:new FormControl("",Validators.required),
    phone:new FormControl("",Validators.required),

    linkedin:new FormControl("",Validators.required),   
    cv:new FormControl("",Validators.required),   

});



meetgroup = new FormGroup({
  StartTime: new FormControl("", Validators.required),
  EndTime: new FormControl("", Validators.required),
  description: new FormControl("", Validators.required),
  //mentor: new FormControl("", Validators.required),
  //student: new FormControl("", Validators.required),
});

datas1: any=[]

  getUserById(){
    this.PublicDataService.getUserById(this.id).subscribe(res=>{
      this.data=res;
      this.user=this.data
      this.datas1=this.user.domain;
      this.datas1=JSON.parse(this.datas1) 
    })
  
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }
  onChangeCv(event: any) {
    this.cv = event.target.files[0];
  }
  
  onEdit(){
    this.singleuser=this.userForm.value

    let formdata = new FormData();
    formdata.append('img',this.file);
    formdata.append('cv',this.cv);
    formdata.append('name',this.singleuser.name);
    formdata.append('email',this.singleuser.email);
    formdata.append('domain',JSON.stringify(this.singleuser.domain) );
    formdata.append('profession',this.singleuser.profession);
    formdata.append('linkedin',this.singleuser.linkedin);
    formdata.append('location',this.singleuser.location);
    formdata.append('birth_date',new Date(this.singleuser.birth_date).toDateString());
    console.log(JSON.stringify(this.singleuser.domain))
     this.PublicDataService.updateProfilData(this.id,formdata).subscribe(res=>{  
        window.location.reload()
      })
  
    
  }








  //---------------handle activity
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


  // defined the array of data
public datas: Object[] = ['angular', 'laravel', 'machine learning', 'artificial intelligence'];
// set placeholder text to MultiSelect input element
public text: string = 'Select a technology';

}
