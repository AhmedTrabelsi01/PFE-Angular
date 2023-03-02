import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private httpClient: HttpClient) { }

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


   Postuler(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/addpostulation', data,{ headers: this.createHeader() });
  }

  GetApplicationByID(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getappbyid/'+id,{ headers: this.createHeader() });
  }

  updateApplication(id:any,data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/updateapp/'+id,data,{ headers: this.createHeader() });

  }
  updateFile(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updatefile/'+id,data,{ headers: this.createHeader() });

  }

  autofill(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/autofill',data,{ headers: this.createHeader() });

  }
  addComment(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/addcom', data,{ headers: this.createHeader() });
  
  }

  getOwnedApp(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/checkcomm',data,{ headers: this.createHeader() });
  }

  appPos(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/uppos/'+id,data,{ headers: this.createHeader() });

  }

//---------pagination

  getPageByURL(link:any) {
    return this.httpClient.get(link);
  }
 
  
 
}
