import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements OnInit {

  public currentStream: any
  public dimensionVideo: any


  id_document: string = ''

  ngOnInit(): void {
    this.checkMediaSrc()
    this.getSizeCam()
  }

  constructor() {}

  checkMediaSrc = () => {
    if(navigator && navigator.mediaDevices) {

      navigator.mediaDevices.getUserMedia({
        audio: false, video: true
      }).then(stream => {
        this.currentStream = stream
      }).catch(() => {
        console.log('Error de permisos');
      })

    } else {
      console.log('No tiene dispositivos de media player');
    }
  }

  getSizeCam = () => {
    const elemntCam: HTMLElement =document.querySelector('.webcam')
    const { width, height } = elemntCam.getBoundingClientRect()

    this.dimensionVideo = { width, height }
  }
}
