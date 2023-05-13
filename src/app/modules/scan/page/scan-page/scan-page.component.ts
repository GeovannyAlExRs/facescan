import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-scan-page',
  templateUrl: './scan-page.component.html',
  styleUrls: ['./scan-page.component.css']
})
export class ScanPageComponent implements OnInit, OnDestroy {

  public currentStream: any
  public dimensionVideo: any


  id_document: string = ''

  ngOnInit(): void {
    this.checkMediaSrc()
    this.getSizeCam()
  }

  ngOnDestroy(): void {
  }

  constructor() {}

  checkMediaSrc = () => {
    try {
      if(navigator && navigator.mediaDevices) {

        navigator.mediaDevices.getUserMedia({
          audio: false, video: true
        }).then(stream => {
          this.currentStream = stream
          //console.log('STREAM: ', stream.active);
        }).catch(() => {
          console.log('Error de permisos');
        })

      } else {
        console.log('No tiene dispositivos de media player');
      }
    } catch (error) {
      console.log('Acceso denegado, debe habilitar la camara.!');
    }

  }

  getSizeCam = () => {
    const elemntCam: HTMLElement =document.querySelector('.webcam')
    const { width, height } = elemntCam.getBoundingClientRect()

    this.dimensionVideo = { width, height }
  }
}
