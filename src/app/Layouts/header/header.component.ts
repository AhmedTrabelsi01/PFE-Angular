import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notiCount: any;
  constructor(private toastr:ToastrService, private route:Router,private PublicDataService: PublicDataService) { }
  auth: any;
  loggeduser: any={};
  token: any;
  role:any;
  profil:any={};
  notifications:any=[];
  imgpath:any ='http://127.0.0.1:8000/storage/post/'
  ngOnInit(): void {
    this.onLogin();
  }
  onLogin() {
    this.token = this.PublicDataService.getToken();
    if (this.token) {
      this.loggeduser = this.PublicDataService.getUser(this.token);
      this.PublicDataService.setLoginState();
      this.PublicDataService.setRole(JSON.stringify( this.loggeduser['role_id']));
      this.role = this.PublicDataService.getRole();
      this.auth = this.PublicDataService.getLoginState();
      this.PublicDataService.getUserById(this.loggeduser['id']).subscribe(res=>{
        this.profil=res;
        this.getNotifications();
        this.getCountNotif();
        if(this.profil.djACA==1){
          localStorage.setItem('authACA', 'true');
        }else{
          localStorage.setItem('authACA', 'false');
        }

      })

    }

  }
 
  onLogout() {
    this.PublicDataService.setToken(""); 
    this.PublicDataService.setLoginStateFalse();
    this.auth = this.PublicDataService.getLoginState();
    this.route.navigate(['']);    
  }

  getCountNotif(){
    this.PublicDataService.getCountNotifs(this.loggeduser['id']).subscribe(res=>{
      this.notifications=res;
       this.notiCount=this.notifications.length;
     })
  }

  getNotifications(){
    this.PublicDataService.getNotifs(this.loggeduser['id']).subscribe(res=>{
     this.notifications=res;

    })

  }

  setOldnotifs(){
    this.PublicDataService.setOldnotif(this.loggeduser['id']).subscribe(res=>{
      //this.getCountNotif();
      this.notiCount=0;
      this.getNotifications();


     })
  }

  onDelete(notiID:any){
    this.PublicDataService.deleteNotifications(notiID).subscribe(res=>{
      this.toastr.success("Notification deleted ! ")
      this.getNotifications();
    })
  }

  }




