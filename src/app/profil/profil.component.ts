import { Component, OnInit } from '@angular/core';
import { PublicDataService } from '../services/public-data.service';
import { MentorDataService } from '../services/mentor-data.service';
import { ActivatedRoute } from '@angular/router';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { EMPTY, empty, Observable } from 'rxjs';
declare function popup(): any;

@Component({
  selector: 'app-profil',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],

  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  //histories: any;
  //startups: any;
  //countstar: any;
  //counthis: any;
  time$: Observable<any>;
  clock: Observable<Date> | undefined;
  votes: any = undefined;
  test: any = {};

  ownedVote: any;
  countOwnedVote = 0;

  constructor(private MentorDataService: MentorDataService, private PublicDataService: PublicDataService, private route: ActivatedRoute) {
    this.time$ = this.PublicDataService.getDate();
  }
  auth: any;
  loggeduser: any;
  token: any;
  role: any;
  votetest:any;
  users: any = {};
  id: any;
  projects: any = [];
  applications: any = [];
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'//image path laravel
 //variable calender
 public url: any = "http://127.0.0.1:8000/api/getMeetByUser/ "+ this.route.snapshot.params['id'] ;
 public currentDate!: Date;
 public setView: View = 'Month';
 title = 'Calendar';
 public setDate: Date = new Date();
 //end variable calender







  ngOnInit(): void {
    this.clock = this.PublicDataService.getClock();
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
    this.id = this.route.snapshot.params['id'];
    this.auth = this.PublicDataService.getLoginState();
    this.role = this.PublicDataService.getRole();
      this.getVotingEvent();
      this.GetProfielById();
      //this.getOwnedStartup();
      //this.getOwnedHistory();
      if (this.role == '1') {
        this.GetOwnedApplications();
      }
      if (this.role != '1') {

        this.GetOwnedProjects();
      }


    popup()



  }

  checkVoteAbility() {
    let formdata = new FormData();
    formdata.append('user_id', this.users.id);
    formdata.append('vote_id', this.test.id);


    let formdata1 = new FormData();
    formdata1.append('user_id', this.users.user_id);
    formdata1.append('meet_id', this.test.meet_id);

    
    this.PublicDataService.checkAud(formdata1).subscribe(res => {
      this.votetest = res;


    }
    )


    this.PublicDataService.checkVote(formdata).subscribe(res => {
      this.ownedVote = res;
      this.countOwnedVote = this.ownedVote.length;

      if (this.countOwnedVote == 0) {

        if (Object.keys(this.test).length != 0 && this.votetest.result==true) {
          this.votes = this.test;

        }
      }
    }
    )
  }

  getVotingEvent() {
    this.PublicDataService.getVotes().subscribe(res => {
      this.test = res;


    }
    )
  }
//function calender
private dataManager: DataManager = new DataManager({
  url: this.url,
  adaptor: new UrlAdaptor,
  crossDomain: true,

});
public eventSettings: EventSettingsModel = {
  dataSource: this.dataManager

};
//end function calaender



  GetProfielById() {
    this.PublicDataService.getUserById(this.id).subscribe(res => {
      this.users = res;
      console.log(this.users)
      this.users.domain=JSON.parse(this.users.domain)
      this.checkVoteAbility();

    }
    )
  }



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




  GetOwnedProjects() {
    this.PublicDataService.GetOwnedProjects(this.id).subscribe(res => {
      this.projects = res;
    }
    )
  }

  GetOwnedApplications() {
    this.PublicDataService.GetOwnedApplications(this.id).subscribe(res => {
      this.applications = res;
    }
    )
  }

  upVote(id: any) {
    let formdata = new FormData();
    formdata.append('user_id', this.users.id);
    this.PublicDataService.upVote(id, formdata).subscribe(res => {
      window.location.reload();

    }
    )
  }
  donwVote(id: any) {
    let formdata = new FormData();
    formdata.append('user_id', this.users.id);
    this.PublicDataService.downVote(id, formdata).subscribe(res => {
      window.location.reload();
    }
    )
  }


  onDeleteApp(idapp: any) {
    this.PublicDataService.deleteApplication(idapp).subscribe(res => {
    }
    )

  }

  onDeletepro(idproj: any) {
    this.PublicDataService.deleteProject(idproj).subscribe(res => {
    })

  }


}
