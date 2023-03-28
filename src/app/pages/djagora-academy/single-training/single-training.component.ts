import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { StudentDataService } from 'src/app/services/student-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MentorDataService } from 'src/app/services/mentor-data.service';
@Component({
  selector: 'app-single-training',
  templateUrl: './single-training.component.html',
  styleUrls: ['./single-training.component.css']
})
export class SingleTrainingComponent implements OnInit {
  auth: any;
  role: any;
  id: any;
  user: any;
  date:any=[]
  loggeduser: any = {};
  token: any;
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'
Singleformation:any={};

  constructor(private MentorDataService: MentorDataService, private route1: Router, private toastr: ToastrService, private route: ActivatedRoute, private PublicDataService: PublicDataService, private StudentDataService: StudentDataService) { }
loader=true
  ngOnInit(): void {
    window.scrollTo(0,0)
    this.id = this.route.snapshot.params['id'];
    this.auth = this.PublicDataService.getLoginState();
    this.role = this.PublicDataService.getRole();
    this.token = this.PublicDataService.getToken();
    if (this.token) {
      this.loggeduser = this.PublicDataService.getUser(this.token);
      this.PublicDataService.getUserById(this.loggeduser['id']).subscribe(res => {
        this.user = res
      })
    }

    this.getFormationById()
  }
  

  
getFormationById(){
      this.PublicDataService.getTrainingById(this.id).subscribe(res => {
        this.Singleformation = res
        this.Singleformation=this.Singleformation.formation
        this.date=this.Singleformation.date
        this.loader=false
      })
}

}

