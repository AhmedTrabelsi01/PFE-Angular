import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  admins:any;
  teams:any;
  imgpath:any ='http://127.0.0.1:8000/storage/post/';
  constructor(private PublicDataService:PublicDataService) { }
  ngOnInit(): void {
    this.getAdmins();
    window.scrollTo(0,0)
 //   this.getTeam();
  }

  //get team djagora acadimy
/*  getTeam(){
    this.PublicDataService.GetTeam().subscribe(res=>{
      this.teams=res;})}
*/
getAdmins(){
  this.PublicDataService.getAdmins().subscribe(res=>{
    this.admins=res;
  });
}
}
