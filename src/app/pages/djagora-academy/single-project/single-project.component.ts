import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { StudentDataService } from 'src/app/services/student-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MentorDataService } from 'src/app/services/mentor-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  data: any;
  id: any;
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'
  SingleProject: any = {};
  ProjectOwner: any = [];
  auth: any;
  role: any;
  edition: any = {}
  loggeduser: any = {};
  token: any;
  applications: any = [];
  countapp: any;
  user: any;
  commentss: any = [];
  comment: any;
  countcom: any;
  countapprouvedApps: any
  countPenApps: any;
  approuvedApps: any = [];
  ownedApp: any = [];
  penApps: any = [];
  error: any = [];
  postulation: any = {}
  countOwnedApp: any;
  loader:any=true
  CommentGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    user_id: new FormControl("", Validators.required),
    content: new FormControl("", Validators.required),
    project_id: new FormControl("", Validators.required),


  });




  constructor(private MentorDataService: MentorDataService, private route1: Router, private toastr: ToastrService, private route: ActivatedRoute, private PublicDataService: PublicDataService, private StudentDataService: StudentDataService) { }

  ngOnInit(): void {

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
    this.getProjectById();
  }


  //----get private application
  getOwnedApp() {
    let formdata = new FormData();
    formdata.append('project_id', this.SingleProject.id);
    formdata.append('user_id', this.loggeduser['id']);

    this.StudentDataService.getOwnedApp(formdata).subscribe(res => {
      this.ownedApp = res
      if(this.ownedApp){
        this.loader=false
       }
      this.countOwnedApp = this.ownedApp.length;
      if (this.countOwnedApp > 0) {
        this.ownedApp = this.ownedApp[0];

      }


    })

  }



  getProjectById() {
    this.PublicDataService.getProjectById(this.id).subscribe(res => {
      this.data = res;
      this.SingleProject = this.data;
      if(this.SingleProject){
        this.loader=false
       }
      this.PublicDataService.getUserById(this.SingleProject.user_id).subscribe(res => {
        this.data = res;
        this.ProjectOwner = this.data;
        //console.log('catched', this.ProjectOwner)
        if (this.ProjectOwner.user_id == this.loggeduser['id']) {
          this.getPendingApps();
        }
        if (this.role == '1') {
          this.getOwnedApp();
        }
        this.getEdition();
        this.getcommentsByProject();
        this.getAppPosByProject();
        this.getCountApps();

      })

    })

  }
  getEdition() {
    this.PublicDataService.getedition(this.SingleProject.edition_id).subscribe(res => {
      this.edition = res;
       if(this.edition){
        this.loader=false
       }
    })
  }

  getCountApps() {
    this.PublicDataService.getCountApps(this.SingleProject.id).subscribe(res => {
      this.countapp = res;
      if(this.countapp){
        this.loader=false
       }
    })
  }



  //---approuved
  getAppPosByProject() {
    this.PublicDataService.getAppApplication(this.SingleProject.id).subscribe(res => {
      this.approuvedApps = res;
      if(this.approuvedApps){
        this.loader=false
       }
      this.countapprouvedApps = this.approuvedApps.length;
    })

  }


  //-----get pending applications
  getPendingApps() {
    this.PublicDataService.getPendingApps(this.SingleProject.id).subscribe(res => {
      this.penApps = res;
      if(this.penApps){
        this.loader=false
       }
      this.countPenApps = this.penApps.length;
    })
  }


  //---------------comments



  getcommentsByProject() {
    this.PublicDataService.getComments(this.SingleProject.id).subscribe(res => {
      this.commentss = res;
      if(this.commentss){
        this.loader=false
       }
      this.countcom = this.commentss.length;

    })
  }


  appPos(appId: any) {
    let data: any
    this.StudentDataService.appPos(appId, data).subscribe(res => {
      this.toastr.success("Application approuved")
      this.getPendingApps()
      this.getAppPosByProject()
    })

  }


  onSubmitComm() {
    this.comment = this.CommentGroup.value
    let formdata = new FormData();
    formdata.append('content', this.comment.content);
    formdata.append('project_id', this.SingleProject.id);
    formdata.append('user_id', this.loggeduser['id']);


    this.StudentDataService.addComment(formdata).subscribe(res => {
      this.getcommentsByProject()
    })


  }


  endProj(id: any) {
    let data: any
    this.MentorDataService.endProject(id, data).subscribe(res => {
      this.toastr.success('Project closed!');

    })
  }


  onApply() {

    if (this.edition.stateRS == 0) {
      this.toastr.error("application will oppen on ", this.edition.StartRS)
    } else {
      if (this.edition.stateRS == -1) {
        this.toastr.error("application is closed")
      } else {
        let formdata = new FormData();
        formdata.append('project_id', this.SingleProject.id);
        formdata.append('user_id', this.user.user_id);
        formdata.append('name', this.user.name);
        formdata.append('email', this.user.email);
        formdata.append('number', this.user.phone.number);
        formdata.append('cv', this.user.cv);
        if (!this.user.cv) {
          this.toastr.error('CV required');
          setTimeout(() => { this.route1.navigate(['/myProfil', this.user.user_id]) }, 500);

        } else {

          this.StudentDataService.Postuler(formdata).subscribe(res => {
            this.error = res;

            if (this.error == null) {
              this.toastr.success('Applied successfully');
              setTimeout(() => { window.location.reload() }, 500);

            }

          })
        }
      }
    }




  }


}
