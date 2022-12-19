import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicDataService } from 'src/app/services/public-data.service';
import { ToastrService } from 'ngx-toastr';
import { StudentDataService } from 'src/app/services/student-data.service';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  postulation: any={};
  file!: File; // Variable to store file
  loading: boolean = false; // Flag variable
  shortLink: string = "";
  error: any = "";
  id: any;
  auth: any;
  token:any;
  counterr:any=0;
  loggedUser: any={};

  constructor(private toastr: ToastrService,private route: ActivatedRoute, private PublicDataService: PublicDataService, private route1: Router, private StudentDataService: StudentDataService) { }



  ngOnInit(): void {


  }


  PostulationtForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    number: new FormControl("", Validators.required),
    cv: new FormControl("", Validators.required),

  })

  get f() {
    return this.PostulationtForm.controls;
  }

  get name() {
    return this.PostulationtForm.get('name');
  }
 
  get email() {
    return this.PostulationtForm.get('email');
  }
  get Number() {
    return this.PostulationtForm.get('Number');
  }
  get cv() {
    return this.PostulationtForm.get('cv');
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {

    this.id = this.route.snapshot.params['id'];
    this.auth = this.PublicDataService.getLoginState();
    this.token=this.PublicDataService.getToken();
    this.loggedUser = this.PublicDataService.getUser(this.token);
    

    this.postulation = this.PostulationtForm.value
    let formdata = new FormData();

    formdata.append('project_id', this.id);
    formdata.append('user_id',this.loggedUser['id']);
    formdata.append('name', this.loggedUser['name']);
    formdata.append('email', this.postulation.email);
    formdata.append('number', this.postulation.number);
    formdata.append('cv', this.file);
    
    this.StudentDataService.Postuler(formdata).subscribe(res => {
      this.error = res;

      if(this.error==null){
        this.toastr.success('Applied successfully');
        setTimeout(() => {this.route1.navigate(['/djagoraacadimy'])  }, 1000);
    
        } 

        if(this.error!=null){
          this.counterr=this.error.length;
    
         } 
     
     
  

    })

  }

}
