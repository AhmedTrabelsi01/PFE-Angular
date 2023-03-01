import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare function slide1():any;
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
  filteredprojects:any=[];
  searchTerm: string ="";//filter term
  auth :any;
  loggeduser: any={};
  token: any;
  role:any;
  edition:any={}
  countproj:any;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel

  ngOnInit(): void {


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
      console.log(this.edition)
    })
  }
 checkEdition(){
  if(this.edition.stateOP!=1){
    this.toastr.error("project is closed")
  }else{
    this.route1.navigate(['/AddProject'])
  }
 }


  GetProject(){
    this.PublicDataService.GetProject().subscribe(res=>{
    this.projectss=res;
    this.next=this.projectss.next_page_url
    this.prev=this.projectss.prev_page_url
    this.projectss=this.projectss.data
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


  nextPage(link:any) {
    this.PublicDataService.getPageByURL(link).subscribe(res=>{
    this.projectss=res;
    this.next=this.projectss.next_page_url
    this.prev=this.projectss.prev_page_url
    this.projectss=this.projectss.data
    })

  }

  prevPage(link:any) {
    this.PublicDataService.getPageByURL(link).subscribe(res=>{
      this.projectss=res;
      this.next=this.projectss.next_page_url
      this.prev=this.projectss.prev_page_url
      this.projectss=this.projectss.data
      })

  }

}
