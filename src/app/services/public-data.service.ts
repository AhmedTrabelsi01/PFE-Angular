import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { interval, map } from 'rxjs';
import {  Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicDataService {

  constructor(private httpClient: HttpClient) { }

  //---- header

  createHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders()
        .set('Authorization', token);
      return headers;
    }
    else {
      const headers = new HttpHeaders()

      return headers;
    }
  }

  //------pre regsitration for departements
  preRegisterACA(id:any,data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/preregACA/'+id,data,{ headers: this.createHeader() });
  }
  preRegisterOUT(id:any,data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/preregOUT/'+id,data,{ headers: this.createHeader() });
  }
  preRegisterFAB(id:any,data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/preregFAB/'+id,data,{ headers: this.createHeader() });
  }
  preRegisterJU(id:any,data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/preregJU/'+id,data,{ headers: this.createHeader() });
  }
  preRegisterMD(id:any,data:any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/preregMD/'+id,data,{ headers: this.createHeader() });
  }



  //---contact
  insertContact(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/sendContact', data);
  }
  //---project
  GetProject() {
    return this.httpClient.get('http://127.0.0.1:8000/api/projects', { headers: this.createHeader() });
  }
  GetOwnedProjects(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getownedproj/' + id, { headers: this.createHeader() });
  }
  getProjectById(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/project/' + id);

  }
  updateProject(id: any, data: any) {
    return this.httpClient.put('http://127.0.0.1:8000/api/updateproj/' + id, data, { headers: this.createHeader() });

  }
  deleteProject(id: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/delproj/' + id, { headers: this.createHeader() });

  }


  //---application


  GetOwnedApplications(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getownedapp/' + id, { headers: this.createHeader() });
  }

  deleteApplication(id: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/delapp/' + id, { headers: this.createHeader() });

  }






  //-----register
  insertMentor(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/register_men', data);
  }
  insertStudent(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/register_stud', data);
  }

  //-----login
  loginUser(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/login', data);
  }




  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getLoginState() {
    return localStorage.getItem('loginState');
  }

  setLoginStateFalse() {
    localStorage.setItem('loginState', 'false');
  }

  setLoginState() {
    localStorage.setItem('loginState', 'true');
  }

  getRole() {
    return localStorage.getItem('userRole');
  }

  setRole(role: string) {
    localStorage.setItem('userRole', role);
  }

  getUser(token: any) {
    let decoded = token;
    let loggedUser = jwt_decode(decoded)
    return loggedUser;
  }
  /*
    getUserRole(token: any) {
      let loggeduser = this.getUser(token);
      return loggeduser;
    }*/
  // aboutus gett team
  GetTeam() {
    return this.httpClient.get('http://127.0.0.1:8000/api/contacts');
  }
  //profiels
  getUserById(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/profil/' + id, { headers: this.createHeader() });

  }
  updateProfilData(id: any, data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/updateprofil/' + id, data, { headers: this.createHeader() });

  }

  getProjectApplication(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/postulations/' + id, { headers: this.createHeader() });

  }
  getSinProjectApplication(data: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/sinpostulation', { headers: this.createHeader() });

  }

  getNotifs(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/notifs/' + id, { headers: this.createHeader() });

  }

  getComments(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/comments/' + id, { headers: this.createHeader() });

  }
  updateArchiveState(id: any, data: any) {
    return this.httpClient.put('http://127.0.0.1:8000/api/uparch/' + id, data, { headers: this.createHeader() });
  }


  getArchive() {
    return this.httpClient.get('http://127.0.0.1:8000/api/archive', { headers: this.createHeader() });

  }

  getAppPos(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/appposbyproj/' + id, { headers: this.createHeader() });

  }


  getAppSenior(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/senbyproj/' + id, { headers: this.createHeader() });

  }





  getCountNotifs(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/countnotifs/' + id, { headers: this.createHeader() });

  }

  setOldnotif(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/setnotifs/' + id, { headers: this.createHeader() });

  }





  deleteNotifications(id: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/delnot/' + id, { headers: this.createHeader() });

  }


  resPassword(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/respass', data);
  }



  getAppApplication(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/appposbyproj/'+id);
  }


  getCountApps(id:any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getcountapp/'+id);

  }
  getPendingApps(id:any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/postulations/'+id);

  }


  getVotes() {
    return this.httpClient.get('http://127.0.0.1:8000/api/getvotes');

  }

  checkVote(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/getownedvote',data);

  }


  checkAud(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/checkvoteability',data);

  }

  upVote(id:any,data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/upvote/'+id,data);

  }
  downVote(id:any,data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/downvote/'+id,data);
  }

  getedition(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/testedition/'+id);
  }

  getactiveedition(){
    return this.httpClient.get('http://127.0.0.1:8000/api/activeedition');
  }

  updateEdition(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/updateedition',data);

  }

  

  getClock() : Observable<Date> {
    return interval(1000).pipe(
      mergeMap(() => of(new Date()))
    )
  }

  date = new Date();

  getDate() {
    return interval(1000).pipe(map(_ => this.getDateTime()));
  }

  // get new time by adding + sec
  private getDateTime() {
    this.date.setSeconds(this.date.getSeconds() + 1);
    return (
      this.date.getHours() +
      ':' +
      this.date.getMinutes() +
      ':' +
      this.date.getSeconds()
    );
  }


  getPageByURL(link:any) {
    return this.httpClient.get(link);
  }
  getPageByURL1(link:any) {
    return this.httpClient.get(link);
  }
  getFormations(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getFormations');

  }
  getArchiveFormations(){
    return this.httpClient.get('http://127.0.0.1:8000/api/getArchiveFormations');

  }

  getTrainingById(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getFormationById/' + id, { headers: this.createHeader() });

  }


/***********user stories */

  addUserStory(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/addUserStory',data);

  }

  updateUserStory(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/updateUserStory', data ,{ headers: this.createHeader() });
  }

  getUserStories(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getnoneaffUserStories/' + id, { headers: this.createHeader() });
  }
  getUserStoriesByProj(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getAllUserStoriesByProj/' + id, { headers: this.createHeader() });
  }

  getAffUserStories(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getafflUserStories/' + id, { headers: this.createHeader() });
  }

  getUserStoryById(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getUserStoryById/' + id, { headers: this.createHeader() } )
  }
  getUserStoryByBoard(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getuserstoriesbyboard/' + id, { headers: this.createHeader() } )
  }

  /*****************sprints */

  getSprints(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getSprintByProject/' + id, { headers: this.createHeader() });
  }
  getSprintByID(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getSprintByid/' + id, { headers: this.createHeader() });
  }
  updateSprint(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/editsprint',data, { headers: this.createHeader() });
  }
  updateData(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/updatearrays',data, { headers: this.createHeader() });
  }
  updateBoard(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/updateboard',data, { headers: this.createHeader() });
  }
  updateScrumMaster(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/setscrummaster',data, { headers: this.createHeader() });
  }

  getScrumMaster(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getscrummaster/'+id, { headers: this.createHeader() });
  }
  getSprintScrumMaster(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getsprintscrummaster/'+id, { headers: this.createHeader() });
  }

  updateSprintAuto(id:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/updatesprintauto/'+id, { headers: this.createHeader() });
  }
  
  /******************* Ideas ******************/
  addIdea(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/addIdea',data, { headers: this.createHeader() });
  }
  getIdeas(id:any){
    return this.httpClient.get('http://127.0.0.1:8000/api/getIdeas/'+id, { headers: this.createHeader() });
  }
  deleteIdea(id:any){
    return this.httpClient.delete('http://127.0.0.1:8000/api/deleteIdea/' + id, { headers: this.createHeader() });
  }
}
