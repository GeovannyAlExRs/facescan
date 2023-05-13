import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FaceApiService } from '@shared/services/face-api/face-api.service';
import { FirebaseConnectService } from '@shared/services/firebase/firebase-connect.service';
import { IdUserService } from '@shared/services/id-user/id-user.service';
import { ProcessFaceService } from '@shared/services/process-face/process-face.service';
import { VideoServices } from '@shared/services/video-service/video-service.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input() stream: any
  @Input() width: number
  @Input() height: number

  @ViewChild('asVideoElement') videoElement: ElementRef
  //@ViewChild('asCanvasElement') canvasElement: ElementRef
  //public context!: CanvasRenderingContext2D;

  @Input() id_document: string = ''
  mockImg: any[] = []
  state: string ='paused'
  listEvents: Array<any> = []
  modelsReady: boolean
  loading: boolean
  loadingText: string = ''
  overCanvas: any


  constructor(private renderer: Renderer2, private elementRef: ElementRef,
              private faceApiService: FaceApiService, private videoServices: VideoServices,
              private firebaseService: FirebaseConnectService, private processFaceService: ProcessFaceService,
              private idUserService: IdUserService) {}

  ngOnInit(): void {
    this.loading = true
    this.listImg()
    this.listenerEvents()
  }

  ngOnDestroy(): void {
    this.listEvents.forEach(event => { event.unsubscribe() });
    this.videoElement.nativeElement.pause()
    this.modelsReady = true
    this.state = 'pause'
    if (this.videoElement) {
      this.videoElement.nativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
    }
  }

  listenerEvents = () => {
    const observer1$ = this.faceApiService.callbackModels.subscribe(res => {
      //setInterval(() => {this.modelsReady = true}, 250)
      this.modelsReady = true
      this.checkFace()
      this.loading = false
      this.loadingText = 'Active la camara'
    })

    const observer2$ = this.videoServices.callBackAi
                      .subscribe(({ resizedDetections, displaySize, expressions, eyes, videoElement }) => {
                        resizedDetections = resizedDetections || null
                        if(resizedDetections) {
                          this.drawFace(resizedDetections, displaySize, eyes)
                          this.processFaceService.descriptor(resizedDetections)
                          this.idUserService.id_document.emit(this.processFaceService.idImg)
                        } else {
                          console.log('NO DETECTA ROSTRO');

                          this.idUserService.id_document.emit('')
                        }

                      })

    this.listEvents = [observer1$, observer2$]
  }

  checkFace = () => {
    setInterval(async () => {
      await this.videoServices.getLandMark(this.videoElement)
    }, 500)
  }

  drawFace = (resizedDetections, displaySize, eyes) => {
    try {
      this.loading = true
      this.modelsReady = true
      const { globalFace } = this.faceApiService
      if(this.state !== 'paused') {
        if (this.videoElement) {
          this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
          globalFace.draw.drawDetections(this.overCanvas, resizedDetections)
          //globalFace.draw.drawFaceLandmarks(this.overCanvas, resizedDetections)
        }
      } else {
        this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
      }
    } catch (error) {
      //console.log('ERROR AL REPRODUCIR VIDEO: ', error);
      //this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
    }
  }

  loadedMetadata(): void {
    this.videoElement.nativeElement.play()
  }

  listenerPlay(): void {
    try {
      if (this.videoElement) {
        const { globalFace } = this.faceApiService

        this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement)
        this.renderer.setProperty(this.overCanvas, 'id', 'new-canvas-over')
        this.renderer.setStyle(this.overCanvas, 'width', `${this.width}px`)
        this.renderer.setStyle(this.overCanvas, 'height', `${this.height}px`)
        this.renderer.appendChild(this.elementRef.nativeElement, this.overCanvas)
      }
    } catch (error) {
      console.log('Aun no se ha podido crear el canvas, pause la camara');
    }
  }

  enableDetection(): void {
    if(this.state !== 'paused') {
      this.state = 'paused'
      this.videoElement.nativeElement.pause()
      console.log('VIDEO PAUSE - STATE: ', this.state);
    } else {
      this.loadingText = 'Loading...'
      this.loadedMetadata()
      this.state = 'play'
      console.log('VIDEO PLAY - STATE: ', this.state);
    }
  }

  listImg() {
    this.firebaseService.getImageFirebase().subscribe((res: any) => {
      this.mockImg = res

      this.mockImg.forEach((img: any) => {
        const imgElement = document.createElement('img')
        imgElement.src = img.imgUrl
        imgElement.crossOrigin = 'anonymous'

        this.processFaceService.processImgFace(imgElement, img.id)
      })
    })
  }
}
