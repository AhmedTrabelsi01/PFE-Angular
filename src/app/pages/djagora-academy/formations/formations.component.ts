import { Component, OnInit } from '@angular/core';
import { PublicDataService } from 'src/app/services/public-data.service';
@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  constructor(private PublicDataService: PublicDataService) { }
  imgpath: any = 'http://127.0.0.1:8000/storage/post/'//image path laravel
  formations: any = [];
  archive: any = [];

  loader= true
  user: any
  len: any
  next:any;
  prev:any;
  next1:any;
  prev1:any;

  ngOnInit(): void {
    window.scrollTo(0,0)

    this.getFormations();
    this.getArchiveFormations()
  }

  /*******user */
  

  getUserById(id: any) {
    this.PublicDataService.getUserById(id).subscribe(res => {
      this.user = res;
      if (this.user) {
        this.loader = false
      }
    })
  }

  /************trainings */

  getFormations() {
    this.PublicDataService.getFormations().subscribe(res => {
      this.formations = res;
      if (this.formations) {
        this.loader = false
      }
      this.next=this.formations.next_page_url
      this.prev=this.formations.prev_page_url
      this.formations=this.formations.data
    })
  }

  nextPage(link:any) {
    this.PublicDataService.getPageByURL(link).subscribe(res=>{
    this.formations=res;
    this.next=this.formations.next_page_url
    this.prev=this.formations.prev_page_url
    this.formations=this.formations.data
    })

  }

  prevPage(link:any) {
    this.PublicDataService.getPageByURL(link).subscribe(res=>{
      this.formations=res;
      this.next=this.formations.next_page_url
      this.prev=this.formations.prev_page_url
      this.formations=this.formations.data
      })

  }



  /************************archive */

  getArchiveFormations() {
    this.PublicDataService.getArchiveFormations().subscribe(res => {
      this.archive = res;
      if (this.formations) {
        this.loader = false
      }
      this.next1=this.archive.next_page_url
      this.prev1=this.archive.prev_page_url
      this.archive=this.archive.data
    })
  }

  nextPage1(link:any) {
    this.PublicDataService.getPageByURL1(link).subscribe(res=>{
    this.archive=res;
    this.next1=this.archive.next_page_url
    this.prev1=this.archive.prev_page_url
    this.archive=this.archive.data
    })

  }

  prevPage1(link:any) {
    this.PublicDataService.getPageByURL1(link).subscribe(res=>{
      this.archive=res;
      this.next1=this.archive.next_page_url
      this.prev1=this.archive.prev_page_url
      this.archive=this.archive.data
      })

  }
}
