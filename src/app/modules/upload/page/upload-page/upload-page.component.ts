import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent  implements OnInit{

  constructor() {}

  ngOnInit(): void {}

  onSelectFile(e: any) {
    if(e.target.files) {

    }

  }
}
