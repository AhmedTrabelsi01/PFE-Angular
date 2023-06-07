import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  archive: any=[];
  countar: any;
  acaState: any;
  constructor(private toastr:ToastrService,private route1:Router,private route:ActivatedRoute,private PublicDataService:PublicDataService) { }
  st: string="";//filter button
  projects:any=[];
  projectss:any=[];
  next:any;
  prev:any;
  next1:any;
  prev1:any;
  filteredprojects:any=[];
  searchTerm: string ="";//filter term
  auth :any;
  loggeduser: any={};
  token: any;
  role:any;
  edition:any={}
  loader:any=true
  countproj:any;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel

  ngOnInit(): void {

    window.scrollTo(0,0)

    this.GetProject();
    this.GetArchive() ;
    this.getEdition();

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

  getEdition() {
    this.PublicDataService.getactiveedition().subscribe(res => {
      this.edition = res;
      if(this.archive){
        this.loader=false
       }
    })
  }
 checkEdition(){
  if(this.edition.stateOP!=1){
    this.toastr.error("project is closed")
  }else{
    this.route1.navigate(['/AddProject'])
  }
 }

/*********************projects */
  GetProject(){
    this.PublicDataService.GetProject().subscribe(res=>{
    this.projectss=res;
    if(this.archive){
      this.loader=false
     }
    this.next=this.projectss.next_page_url
    this.prev=this.projectss.prev_page_url
    this.projectss=this.projectss.data
    this.countproj=this.projectss.length;
    }
      )
  }

  nextPage(link:any) {
    this.PublicDataService.getPageByURL(link).subscribe(res=>{
    this.projectss=res;
    this.next=this.projectss.next_page_url
    this.prev=this.projectss.prev_page_url
    this.projectss=this.projectss.data
    window.scrollTo(0, 0)

    })

  }

  prevPage(link:any) {
    this.PublicDataService.getPageByURL(link).subscribe(res=>{
      this.projectss=res;
      this.next=this.projectss.next_page_url
      this.prev=this.projectss.prev_page_url
      this.projectss=this.projectss.data
      window.scrollTo(0, 0)

      })

  }



/************************archive */
GetArchive(){

  this.PublicDataService.getArchive().subscribe(res=>{
    this.archive=res;
    if(this.archive){
      this.loader=false
     }
    this.next1=this.archive.next_page_url
    this.prev1=this.archive.prev_page_url
    this.archive=this.archive.data
    this.countar=this.archive.length;

  }
    )

}


  nextPage1(link:any) {
    this.PublicDataService.getPageByURL1(link).subscribe(res=>{
    this.archive=res;
    this.next1=this.archive.next_page_url
    this.prev1=this.archive.prev_page_url
    this.archive=this.archive.data
    })

  }

  prevPage1(link:any) {
    this.PublicDataService.getPageByURL1(link).subscribe(res=>{
      this.archive=res;
      this.next1=this.archive.next_page_url
      this.prev1=this.archive.prev_page_url
      this.archive=this.archive.data
      })

  }

}
