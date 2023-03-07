import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  constructor(private PublicDataService: PublicDataService) { }
  imgpath:any ='http://127.0.0.1:8000/storage/post/'//image path laravel
  formations: any = {};
  loader: any = true
  ngOnInit(): void {
    this.getFormations();
  }
  getFormations() {
    this.PublicDataService.getFormations().subscribe(res => {
      this.formations = res;
      console.log( this.formations)
      if (this.formations) {
        this.loader = false
      }
    })
  }
}
