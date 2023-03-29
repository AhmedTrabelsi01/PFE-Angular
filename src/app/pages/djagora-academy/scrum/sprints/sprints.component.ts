import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
  userStory:any;
  token:any;
  loggeduser:any={};
  auth:any;
  role:any;
  error:any;
  id:any;
  loader=true
sprints:any=[];
  constructor(private PublicDataService:PublicDataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.id = this.route.snapshot.params['id'];

    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role=this.PublicDataService.getRole();
    this.auth=this.PublicDataService.getLoginState();
    this.  getSprints()
  }
  getSprints(){
    this.PublicDataService.getSprints(this.id).subscribe(res=>{
      this.sprints=res;
      this.loader=false;
   })
  }

}
