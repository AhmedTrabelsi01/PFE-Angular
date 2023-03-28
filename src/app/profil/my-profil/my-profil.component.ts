import { Component, OnInit } from '@angular/core';
import { StudentDataService } from 'src/app/services/student-data.service';
import { MentorDataService } from 'src/app/services/mentor-data.service';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ActivatedRoute } from '@angular/router';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { EMPTY, empty, Observable } from 'rxjs';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.css']
})
export class MyProfilComponent implements OnInit {
  time$: Observable<any>;
  clock: Observable<Date> | undefined;
  votes: any = undefined;
  test: any = {};
  ownedVote: any;
  countOwnedVote = 0;
  next: any;
  prev: any;
  auth: any;
  loggeduser: any;
  token: any;
  role: any;
  votetest: any;
  users: any = {};
  id: any;
  projects: any = [];
  applications: any = [];
  loader: any = true
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'//image path laravel
  //variable calender
  public url: any = "http://127.0.0.1:8000/api/getMeetByUser/ " + this.route.snapshot.params['id'];
  public currentDate!: Date;
  public setView: View = 'Month';
  title = 'Calendar';
  public setDate: Date = new Date();
  //end variable calender

  constructor(private StudentDataService: StudentDataService, private MentorDataService: MentorDataService, private PublicDataService: PublicDataService, private route: ActivatedRoute) {
    this.time$ = this.PublicDataService.getDate();
  }
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.clock = this.PublicDataService.getClock();
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.id = this.route.snapshot.params['id'];
    this.auth = this.PublicDataService.getLoginState();
    this.role = this.PublicDataService.getRole();
    this.getVotingEvent();
    this.GetProfielById();
    if (this.role == '1') {
      this.GetOwnedApplications();
    }
    if (this.role != '1') {
      this.GetOwnedProjects();
    }
  }

  checkVoteAbility() {
    let formdata = new FormData();
    formdata.append('user_id', this.users.user_id);
    formdata.append('vote_id', this.test.id);
    formdata.append('meet_id', this.test.meet_id);
    this.PublicDataService.checkAud(formdata).subscribe(res => {
      this.votetest = res
      if (this.votetest) {
        this.loader = false
      }
      if (this.votetest.result == true) {
        this.votes = this.test;
      }
    }
    )
  }
  //get active voting event for the day
  getVotingEvent() {
    this.PublicDataService.getVotes().subscribe(res => {
      this.test = res;
      if (this.test) {
        this.loader = false
      }
    }
    )
  }




  public url1: any
  private dataManager1: DataManager = new DataManager();
  public eventSettings1: EventSettingsModel = {};

  getMentorMeets() {

    this.url1 = "http://127.0.0.1:8000/api/memeets/" + this.id;
    this.dataManager1 = new DataManager({

      url: this.url1,
      adaptor: new UrlAdaptor,
      crossDomain: true,

    });

    this.eventSettings1 = {
      dataSource: this.dataManager1

    };

  }

  getStudentMeets() {
    this.url1 = "http://127.0.0.1:8000/api/stmeets/" + this.id;
    this.dataManager1 = new DataManager({

      url: this.url1,
      adaptor: new UrlAdaptor,
      crossDomain: true,

    });

    this.eventSettings1 = {
      dataSource: this.dataManager1

    };

  }


  //get profile by id

  GetProfielById() {
    this.PublicDataService.getUserById(this.id).subscribe(res => {
      this.users = res;
      if (this.users) {
        this.loader = false
      }
      //console.log(this.users)
      this.users.domain = JSON.parse(this.users.domain)
      this.checkVoteAbility();

      if (this.role == '1') {
        this.getStudentMeets();
      }
      if (this.role != '1') {
        this.getMentorMeets();
      }
    }
    )

  }




  GetOwnedProjects() {
    this.PublicDataService.GetOwnedProjects(this.id).subscribe(res => {
      this.projects = res;
      this.next = this.projects.next_page_url
      this.prev = this.projects.prev_page_url
      this.projects = this.projects.data
      if (this.projects) {
        this.loader = false
      }
    }
    )
  }

  GetOwnedApplications() {
    this.PublicDataService.GetOwnedApplications(this.id).subscribe(res => {
      this.applications = res;
      this.next = this.applications.next_page_url
      this.prev = this.applications.prev_page_url
      this.applications = this.applications.data
      if (this.applications) {
        this.loader = false
      }
    }
    )
  }

  upVote(id: any) {
    let formdata = new FormData();
    formdata.append('user_id', this.id);
    this.PublicDataService.upVote(id, formdata).subscribe(res => {
      window.location.reload();

    }
    )
  }
  donwVote(id: any) {
    let formdata = new FormData();
    formdata.append('user_id', this.id);
    this.PublicDataService.downVote(id, formdata).subscribe(res => {
      window.location.reload();
    }
    )
  }


  /*onDeleteApp(idapp: any) {
    this.PublicDataService.deleteApplication(idapp).subscribe(res => {
    }
    )

  }

  onDeletepro(idproj: any) {
    this.PublicDataService.deleteProject(idproj).subscribe(res => {
    })

  }*/


  /*getOwnedStartup(){
    this.MentorDataService.getOwnedStartup(this.id).subscribe(res=>{
      this.startups=res;
      this.countstar=this.startups.length;
      }
      )
  }

  getOwnedHistory(){
    this.MentorDataService.getOwnedHistory(this.id).subscribe(res=>{
      this.histories=res;
      this.counthis=this.histories.length;

    }
      )
  }*/



  //---------pagination

  nextPage(link: any) {

    if (this.role == '1') {
      this.StudentDataService.getPageByURL(link).subscribe(res => {
        this.applications = res;
        this.next = this.applications.next_page_url
        this.prev = this.applications.prev_page_url
        this.applications = this.applications.data
      })
    }
    if (this.role != '1') {
      this.PublicDataService.getPageByURL(link).subscribe(res => {
        this.projects = res;
        this.next = this.projects.next_page_url
        this.prev = this.projects.prev_page_url
        this.projects = this.projects.data
      })
    }
  }

  prevPage(link: any) {

    if (this.role == '1') {
      this.StudentDataService.getPageByURL(link).subscribe(res => {
        this.applications = res;
        this.next = this.applications.next_page_url
        this.prev = this.applications.prev_page_url
        this.applications = this.applications.data
      })
    }
    if (this.role != '1') {
      this.MentorDataService.getPageByURL(link).subscribe(res => {
        this.projects = res;
        this.next = this.projects.next_page_url
        this.prev = this.projects.prev_page_url
        this.projects = this.projects.data
      })
    }

  }

}
