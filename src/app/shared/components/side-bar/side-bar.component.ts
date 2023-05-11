import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent  implements OnInit{

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  ngOnInit(): void {

    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/']
      },
      {
        name: 'Upload',
        icon: 'uil uil-image-upload',
        router: ['/', 'upload']
      },
      {
        name: 'Scan Face',
        icon: 'uil uil-capture',
        router: ['/', 'scan'],
      }
    ]
  }
}
