import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorDataService {
  constructor(private httpClient: HttpClient) { }



  //--------------add project
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


  AddProject(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addproject', data, { headers: this.createHeader() });
  }
  GetProject() {
    return this.httpClient.get('http://127.0.0.1:8000/api/contacts', { headers: this.createHeader() });
  }

  GetProjectByID(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/project/' + id, { headers: this.createHeader() });
  }

  updateProj(id: any, data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/updateproj/' + id, data, { headers: this.createHeader() });

  }

  endProject(id: any, data: any) {
    return this.httpClient.put('http://127.0.0.1:8000/api/endproj/' + id, data, { headers: this.createHeader() });
  }

  //----------------history projects

  getOwnedHistory(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getownedhist/' + id, { headers: this.createHeader() });
  }
  getHistById(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/gethistbyid/' + id, { headers: this.createHeader() });
  }


  AddHistory(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addhistory', data, { headers: this.createHeader() });
  }
  updateHistory(id: any, data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/updatehistory/' + id, data, { headers: this.createHeader() });
  }

  deleteHistory(id: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/deletehistory/' + id, { headers: this.createHeader() });
  }



  //-----------------startups



  AddStartup(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addstartup', data, { headers: this.createHeader() });

  }
  updateStartup(id: any, data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/updatestartup/' + id, data, { headers: this.createHeader() });

  }
  getStartupById(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getstarbyid/' + id, { headers: this.createHeader() });
  }

  getOwnedStartup(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getownerstar/' + id, { headers: this.createHeader() });
  }

  deleteStartup(id: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/deletestartup/' + id, { headers: this.createHeader() });
  }


}
