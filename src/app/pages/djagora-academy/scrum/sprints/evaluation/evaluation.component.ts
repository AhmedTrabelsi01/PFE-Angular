import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  userStories: any = [];
  id: any
  loader = true
  token: any;
  loggeduser: any = {};
  auth: any;
  role: any;
  sprint: any = {}
  newSprint: any = {}
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'//image path laravel
  scrumMaster: any = {};
  error: any = [];
  newAffectedData: any = [];
  newUserStories: any = [];
  affected: any = [];
  evaluationSprint1: any
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private PublicDataService: PublicDataService) { }
  SprintForm = new FormGroup({
    name: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required),


  });

  //--------sprint evaluation 1
  statForm = new FormGroup({
    duree: new FormControl("", Validators.required),
  });
  valueSprint1: any;

  //--------sprint evaluation 2
  statForm2 = new FormGroup({
    totalUsers: new FormControl("", Validators.required),
    earlyAdopters: new FormControl("", Validators.required),
    coCreator: new FormControl("", Validators.required),
    hypothesis: new FormControl("", Validators.required),
  })
  valueSprint2: any;

  //--------sprint evaluation 5

  statForm5 = new FormGroup({
    clientparjour: new FormControl("", Validators.required),
    clientparmois: new FormControl("", Validators.required),
    conversions: new FormControl("", Validators.required),
    interactions: new FormControl("", Validators.required),
  })
  valueSprint5: any;

  //--------sprint evaluation 6

  statForm3 = new FormGroup({

    tp1: new FormControl("", Validators.required),
    tp2: new FormControl("", Validators.required),
    tp3: new FormControl("", Validators.required),
    tp4: new FormControl("", Validators.required),
    tp5: new FormControl("", Validators.required),

    uf1: new FormControl("", Validators.required),
    uf2: new FormControl("", Validators.required),
    uf3: new FormControl("", Validators.required),
    uf4: new FormControl("", Validators.required),

    tam1: new FormControl("", Validators.required),
    tam2: new FormControl("", Validators.required),
    tam3: new FormControl("", Validators.required),
    tam4: new FormControl("", Validators.required),
    tam5: new FormControl("", Validators.required),

  })


  statForm4 = new FormGroup({
    q1: new FormControl("", Validators.required),
    q2: new FormControl("", Validators.required),
    q3: new FormControl("", Validators.required),
  })

  statForm6 = new FormGroup({
    vieclient: new FormControl("", Validators.required),
    cotisationclient: new FormControl("", Validators.required),
  })
  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.id = this.route.snapshot.params['id'];
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.role = this.PublicDataService.getRole();
    this.auth = this.PublicDataService.getLoginState();
    this.getSprintById();
  }

  getSprintById() {
    this.PublicDataService.getSprintByID(this.id).subscribe(res => {
      this.sprint = res;
      this.getProjectById()
    })
  }
  SingleProject: any
  getProjectById() {
    this.PublicDataService.getProjectById(this.sprint.project_id).subscribe(res => {
      this.SingleProject = res;
      this.loader = false

    })
  }





  //Function 1
  submitSprint1() {
    this.valueSprint1 = this.statForm.value;
    let formdata = new FormData();
    formdata.append('duree', this.valueSprint1.duree);
    formdata.append('id', this.id);
    this.PublicDataService.submitSprint1(formdata).subscribe(res => {
    }, (error) => {
      if (error.status == 401) {
        this.toastr.error("Access denied")
      };
    });
  }


  //Function 2
  submitSprint2() {
    this.valueSprint2 = this.statForm5.value;
    let formdata = new FormData();
    formdata.append('totalUsers', this.valueSprint2.totalUsers);
    formdata.append('earlyAdopters', this.valueSprint2.earlyAdopters);
    formdata.append('coCreator', this.valueSprint2.coCreator);
    formdata.append('hypothesis', this.valueSprint2.hypothesis);
    formdata.append('id', this.id);
    this.PublicDataService.submitSprint2(formdata).subscribe(res => {

    }, (error) => {
      if (error.status == 401) {
        this.toastr.error("Access denied")
      };
    });
  }


  submitSprint3() {
    this.valueSprint2 = this.statForm3.value;

    let formdata = new FormData();
    formdata.append('array', JSON.stringify(this.statForm3.value));
    formdata.append('id', this.id);
    this.PublicDataService.submitSprint3(formdata).subscribe(res => {

    }, (error) => {
      if (error.status == 401) {
        this.toastr.error("Access denied")
      };
    });
  }

  submitSprint4() {
    this.valueSprint2 = this.statForm4.value;

    let formdata = new FormData();
    console.log(this.statForm4.value)
    formdata.append('array', JSON.stringify(this.statForm4.value));
    formdata.append('id', this.id);
    this.PublicDataService.submitSprint4(formdata).subscribe(res => {

    }, (error) => {
      if (error.status == 401) {
        this.toastr.error("Access denied")
      };
    });
  }

  submitSprint5() {
    this.valueSprint5 = this.statForm5.value;
    let formdata = new FormData();
    formdata.append('clientparjour', this.valueSprint5.clientparjour);
    formdata.append('clientparmois', this.valueSprint5.clientparmois);
    formdata.append('interactions', this.valueSprint5.interactions);
    formdata.append('conversions', this.valueSprint5.conversions);
    formdata.append('id', this.id);
    this.PublicDataService.submitSprint5(formdata).subscribe(res => {

    }, (error) => {
      if (error.status == 401) {
        this.toastr.error("Access denied")
      };
    });
  }


  submitSprint6() {
    this.valueSprint2 = this.statForm6.value;
    let formdata = new FormData();
    formdata.append('vieclient', this.valueSprint2.vieclient);
    formdata.append('cotisationclient', this.valueSprint2.cotisationclient);
    formdata.append('id', this.id);
    this.PublicDataService.submitSprint6(formdata).subscribe(res => {

    }, (error) => {
      if (error.status == 401) {
        this.toastr.error("Access denied")
      };
    });
  }

}
