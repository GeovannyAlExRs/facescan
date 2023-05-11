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
  overCanvas: any


  constructor(private renderer: Renderer2, private elementRef: ElementRef,
              private faceApiService: FaceApiService, private videoServices: VideoServices,
              private firebaseService: FirebaseConnectService, private processFaceService: ProcessFaceService,
              private idUserService: IdUserService) {}

  ngOnInit(): void {
    this.listImg()
    this.listenerEvents()
  }

  ngOnDestroy(): void {
    this.listEvents.forEach(event => { event.unsubscribe() });
    this.stream.getTracks().forEach(track => track.stop())
  }

  listenerEvents = () => {
    const observer1$ = this.faceApiService.callbackModels.subscribe(res => {
      this.modelsReady = true
      this.checkFace()
    })

    const observer2$ = this.videoServices.callBackAi
                      .subscribe(({ resizedDetections, displaySize, expressions, eyes, videoElement }) => {
                        resizedDetections = resizedDetections || null
                        if(resizedDetections) {
                          this.drawFace(resizedDetections, displaySize, eyes)
                          this.processFaceService.descriptor(resizedDetections)
                          //this.id_document = this.processFaceService.idImg
                          //console.log('ID DOCUMENT: ', this.id_document);
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
    const { globalFace } = this.faceApiService

    this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
    globalFace.draw.drawDetections(this.overCanvas, resizedDetections)
    //globalFace.draw.drawFaceLandmarks(this.overCanvas, resizedDetections)
  }

  loadedMetadata(): void {
    this.videoElement.nativeElement.play()
  }

  listenerPlay(): void {
    const { globalFace } = this.faceApiService

    this.overCanvas = globalFace.createCanvasFromMedia(this.videoElement.nativeElement)
    this.renderer.setProperty(this.overCanvas, 'id', 'new-canvas-over')
    this.renderer.setStyle(this.overCanvas, 'width', `${this.width}px`)
    this.renderer.setStyle(this.overCanvas, 'height', `${this.height}px`)
    this.renderer.appendChild(this.elementRef.nativeElement, this.overCanvas)
  }

  enableDetection(): void {
    if(this.state !== 'paused') {
      this.state = 'paused'
      this.videoElement.nativeElement.pause()
      console.log('VIDEO PAUSE - STATE: ', this.state);
    } else {
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
