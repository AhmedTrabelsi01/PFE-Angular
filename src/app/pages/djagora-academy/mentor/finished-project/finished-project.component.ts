import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { StudentDataService } from 'src/app/services/student-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-finished-project',
  templateUrl: './finished-project.component.html',
  styleUrls: ['./finished-project.component.css']
})
export class FinishedProjectComponent implements OnInit {
  data: any;
  id: any;
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'
  SingleProject!: any;
  ProjectOwner!: any;
  auth: any;
  role: any;
  loggeduser: any;
  token: any;
  applications: any;

  AppApplications: any;
  senior: any;
  loader: any = true
  countapprouvedApps: any
  countgetSenior: any
  constructor(private route: ActivatedRoute, private PublicDataService: PublicDataService, private StudentDataService: StudentDataService) { }

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.id = this.route.snapshot.params['id'];
    this.auth = this.PublicDataService.getLoginState();
    this.role = this.PublicDataService.getRole();
    this.token = this.PublicDataService.getToken();
    if (this.token) {
      this.loggeduser = this.PublicDataService.getUser(this.token);
    }
    this.getProjectById();

  }





  getProjectById() {
    this.PublicDataService.getProjectById(this.id).subscribe(res => {
      this.data = res;
      this.SingleProject = this.data;
      if (this.SingleProject) {
        this.loader = false
      }
      this.PublicDataService.getUserById(this.SingleProject.user_id).subscribe(res => {
        this.data = res;
        this.ProjectOwner = this.data;
        this.getAppPostulationByProject();
        this.getSenior();
      })

    })

  }


  getAppPostulationByProject() {
    this.PublicDataService.getAppPos(this.SingleProject.id).subscribe(res => {
      this.AppApplications = res;

      if (this.AppApplications) {
        this.loader = false
      }
      this.countapprouvedApps = this.AppApplications.length;


    })


  }

  getSenior() {

    this.PublicDataService.getAppSenior(this.SingleProject.id).subscribe(res => {
      this.senior = res;
      this.countgetSenior = this.AppApplications.length;

      if (this.senior) {
        this.loader = false
      }

    })


  }



}
