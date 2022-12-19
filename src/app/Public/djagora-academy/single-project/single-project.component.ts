import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { StudentDataService } from 'src/app/services/student-data.service';
import { ActivatedRoute } from '@angular/router';
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
  imgpath:any ='http://127.0.0.1:8000/storage/post/'
  SingleProject!: any;
  ProjectOwner: any = [];
  auth:any;
  role:any;
  loggeduser: any;
  token: any;
  applications:any;
  countapp: any;
  user:any;
  commentss:any;
  comment:any;
  countcom: any;
  countapprouvedApps:any
  countPenApps:any;
  approuvedApps:any;
  ownedApp: any=[];
  penApps: any=[];

  countOwnedApp: any;

  CommentGroup = new FormGroup({
    username: new FormControl("",Validators.required),
    user_id:new FormControl("",Validators.required),
    content:new FormControl("",Validators.required),
    project_id:new FormControl("",Validators.required),

   
});
  



  constructor(private MentorDataService:MentorDataService,private toastr:ToastrService,private route: ActivatedRoute,private PublicDataService:PublicDataService,private StudentDataService:StudentDataService) { }

  ngOnInit(): void {

    this.id=this.route.snapshot.params['id'];
    this.auth = this.PublicDataService.getLoginState();
    this.role = this.PublicDataService.getRole();
    this.token = this.PublicDataService.getToken();
    if(this.token){
      this.loggeduser = this.PublicDataService.getUser(this.token);
      this.PublicDataService.getUserById(this.loggeduser['id']).subscribe(res=>{
        this.user=res
      })
    }
    this.getProjectById();

    
    
  }


 //----get private application 
  getOwnedApp(){
    let formdata = new FormData();
    formdata.append('project_id',this.SingleProject.id);
    formdata.append('user_id',this.loggeduser['id']);
  
    this.StudentDataService.getOwnedApp(formdata).subscribe(res=>{
      this.ownedApp=res
      console.log("this.ownedApp",this.ownedApp);
      this.countOwnedApp=this.ownedApp.length;
      if (this.countOwnedApp>0){
        this.ownedApp=this.ownedApp[0];

      }


    })
    
  }



  getProjectById(){
    this.PublicDataService.getProjectById(this.id).subscribe(res=>{
    this.data=res;
    this.SingleProject=this.data;
    this.PublicDataService.getUserById(this.SingleProject.user_id).subscribe(res=>{
      this.data=res;
      this.ProjectOwner=this.data;
      console.log('catched', this.ProjectOwner)
      if(this.ProjectOwner.user_id==this.loggeduser['id']){
        this.getPendingApps();
      }
      if(this.role=='1'){
        this.getOwnedApp();
      }
      this.getcommentsByProject();
      this.getAppPosByProject();
      this.getCountApps();
 
      })

    })

  }


  getCountApps(){
    this.PublicDataService.getCountApps(this.SingleProject.id).subscribe(res=>{
      this.countapp=res;
      })
  }



//---approuved
  getAppPosByProject(){
    this.PublicDataService.getAppApplication(this.SingleProject.id).subscribe(res=>{
      this.approuvedApps=res;
      this.countapprouvedApps=this.approuvedApps.length;
      })
    
  }


//-----get pending applications
getPendingApps(){  
  this.PublicDataService.getPendingApps(this.SingleProject.id).subscribe(res=>{
    this.penApps=res;
    this.countPenApps=this.penApps.length;
    })
}

 
//---------------comments



  getcommentsByProject(){
    this.PublicDataService.getComments(this.SingleProject.id).subscribe(res=>{
      this.commentss=res;
      this.countcom=this.commentss.length;

    })
  }


  appPos(appId:any){
    let data:any
    this.StudentDataService.appPos(appId,data).subscribe(res=>{
      this.getPendingApps()
    })
    
  }


  onSubmitComm(){
    this.comment=this.CommentGroup.value
    let formdata = new FormData();
    formdata.append('content',this.comment.content);
    formdata.append('project_id',this.SingleProject.id);
    formdata.append('user_id',this.loggeduser['id']);
 
  
    this.StudentDataService.addComment(formdata).subscribe(res=>{
      this.getcommentsByProject()
  })
  
  
  }


  endProj(id:any){
    let data:any
    this.MentorDataService.endProject(id,data).subscribe(res=>{
      this.toastr.success('Project closed!');
 
   })}
    

}