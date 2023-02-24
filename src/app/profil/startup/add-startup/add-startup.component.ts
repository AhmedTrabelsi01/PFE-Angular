import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MentorDataService } from 'src/app/services/mentor-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-startup',
  templateUrl: './add-startup.component.html',
  styleUrls: ['./add-startup.component.css']
})
export class AddStartupComponent implements OnInit {

  history: any;
  loggeduser!: any;
  token: any;
  role: any;
  file!: File; // Variable to store file

  error: any = "";
  auth: any;
  startupForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    img: new FormControl("", Validators.required),


  });
  constructor(private toastr: ToastrService, private PublicDataService: PublicDataService, private MentorDataService: MentorDataService) { }

  ngOnInit(): void {
    this.token = this.PublicDataService.getToken();
    this.loggeduser = this.PublicDataService.getUser(this.token);
  }



  onSubmit() {
    this.history = this.startupForm.value
    let formdata = new FormData();
    formdata.append('user_id', this.loggeduser['id'])
    formdata.append('name', this.history.name);
    formdata.append('description', this.history.description);
    formdata.append('img', this.file);

    this.MentorDataService.AddStartup(formdata).subscribe(res => {
      this.error = res;

      if (this.error == null) {
        this.toastr.success('Startup Added!');
        setTimeout(() => { window.location.reload() }, 1000);
      }



    })
  }


  onChange(event: any) {
    this.file = event.target.files[0];
  }

}
