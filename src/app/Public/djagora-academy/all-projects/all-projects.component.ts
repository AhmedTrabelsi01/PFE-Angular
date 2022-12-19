import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
declare function slide1():any;
@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  archive: any;
  countar: any;
  acaState: any;
  constructor(private route:ActivatedRoute,private PublicDataService:PublicDataService) { }
  st: string="";//filter button
  projects:any;
  projectss:any;

  filteredprojects:any;
  searchTerm: string ="";//filter term
  auth :any;
  loggeduser: any;
  token: any;
  role:any;
  countproj:any;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel

  ngOnInit(): void {
    

    this.GetProject();
    this.GetArchive() ;
    
    this.auth=this.PublicDataService.getLoginState();
    this.role=this.PublicDataService.getRole();
    this.acaState=localStorage.getItem('authACA');
    this.route.params.subscribe(params=>{
      const k =params['searchTerm'];  
      if(k){
        this.st=k;
        this.filteredprojects=this.projectss.filter((project: { name: string; })=>project.name.toLowerCase().includes(k.toLowerCase()));
      
      }
      else{
        this.filteredprojects=this.projectss;  

      }
    })

  }

  
 
  
  
  GetProject(){
    this.PublicDataService.GetProject().subscribe(res=>{
    this.projectss=res;
      this.countproj=this.projectss.length;

    }
      )
  }

  GetArchive(){
    
    this.PublicDataService.getArchive().subscribe(res=>{
      this.archive=res;
      this.countar=this.archive.length;
      slide1()


    }
      )

  }
  



}
