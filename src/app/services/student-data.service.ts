import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private httpClient: HttpClient) { }



   Postuler(data: any) {
    console.log(data)

    return this.httpClient.post('http://127.0.0.1:8000/api/addpostulation', data);
  }

  GetApplicationByID(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/posbyid/'+id);
  }

  updateApplication(id:any,data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/updateapp/'+id,data);

  }
  updateFile(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/updatefile/'+id,data);

  }

  autofill(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/autofill',data);

  }
  addComment(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/addcom', data);
  
  }

  getOwnedApp(data:any){
    return this.httpClient.post('http://127.0.0.1:8000/api/checkcomm',data);
  }

  appPos(id:any,data:any){
    return this.httpClient.put('http://127.0.0.1:8000/api/uppos/'+id,data);

  }


 
  
 
}
