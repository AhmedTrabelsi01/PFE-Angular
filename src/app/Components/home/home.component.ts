import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ToastrService } from 'ngx-toastr';

declare function currentSlide(n: any): any;
declare function slide(): any;
declare function sponsor(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastr: ToastrService, private route: Router, private PublicDataService: PublicDataService) {
  }
  token: any;
  projects: any=[];
  error: any
  user: any={};
  data: any;
  loader=true;
  loggeduser: any;
  p1: any={}
  p2: any={}
  p3: any={}
  auth: any;
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'//image path laravel
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.getRecentProject();
    this.token = this.PublicDataService.getToken();
    if (this.token) {
      this.loggeduser = this.PublicDataService.getUser(this.token);
      this.auth = this.PublicDataService.getLoginState();
      this.PublicDataService.getUserById(this.loggeduser['id']).subscribe(res => {
        this.user = res;
        this.loader=false
      })
    }
   this.updateEdition()
  }


  getRecentProject() {
    this.PublicDataService.GetProject().subscribe(res => {
      this.projects = res;
      this.projects=this.projects.data;
      for (let index = 0; index < this.projects.length; index++) {
        if(this.projects[this.projects.length - 1]) this.p1 = this.projects[this.projects.length - 1];
        if(this.projects[this.projects.length - 2]) this.p2 = this.projects[this.projects.length - 2];
        if(this.projects[this.projects.length - 3]) this.p3 = this.projects[this.projects.length - 3];
      }
    }
    )
  }

  //----------check for edition date
  updateEdition(){
    let data
    this.PublicDataService.updateEdition(data).subscribe(res=>{
     })
  }

  onPreRegisterACA() {

    this.PublicDataService.preRegisterACA(this.user.user_id, this.data).subscribe(res => {

      this.toastr.success('requested successfully!');
      setTimeout(() => { window.location.reload() }, 1000);

    })
  }
  onPreRegisterOUT() {

    this.PublicDataService.preRegisterOUT(this.user.user_id, this.data).subscribe(res => {
      this.toastr.success('requested successfully!');
      setTimeout(() => { window.location.reload() }, 1000);

    })
  }
  onPreRegisterMD() {

    this.PublicDataService.preRegisterMD(this.user.user_id, this.data).subscribe(res => {

      this.toastr.success('requested successfully!');
      window.location.reload()

    })
  }
  onPreRegisterFAB() {

    this.PublicDataService.preRegisterFAB(this.user.user_id, this.data).subscribe(res => {

      this.toastr.success('requested successfully!');
      setTimeout(() => { window.location.reload() }, 1000);

    })
  }
  onPreRegisterJU() {

    this.PublicDataService.preRegisterJU(this.user.user_id, this.data).subscribe(res => {
      this.toastr.success('requested successfully!');
      setTimeout(() => { window.location.reload() }, 1000);

    })
  }

}
