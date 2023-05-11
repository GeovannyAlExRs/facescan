import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  mainMenu: {
    defaultOptions: Array<any>, accessLink: Array<any>
  } = { defaultOptions: [], accessLink: [] }

  ngOnInit(): void {

    this.mainMenu.accessLink = [
      {
        name: 'Facebook',
        icon: 'uil uil-facebook-f',
        link: 'https://www.facebook.com/geovanny.alex.mr'
      },
      {
        name: 'Github',
        icon: 'uil uil-github',
        link: 'https://github.com/GeovannyAlExRs'
      },
      {
        name: 'Linkedin',
        icon: 'uil uil-linkedin',
        link: 'https://www.linkedin.com/in/geovanny-magallan-59ab5b99',
      },
      {
        name: 'Geovanny',
        icon: 'uil uil-link',
        link: ['GeovannyAlexRs']
      }
    ]

    this.mainMenu.defaultOptions = [
      {
        name: 'Cargar Foto',
        icon: 'uil uil-image-upload',
        router: ['/', 'upload']
      },
      {
        name: 'Iniciar Scan',
        icon: 'uil uil-capture',
        router: ['/', 'scan'],
      }
    ]
  }
}
