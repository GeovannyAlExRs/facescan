import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ImageModel } from '@core/model/image.model';
import { FaceApiService } from '@shared/services/face-api/face-api.service';
import { FirebaseConnectService } from '@shared/services/firebase/firebase-connect.service';
import { IdUserService } from '@shared/services/id-user/id-user.service';
import { VideoServices } from '@shared/services/video-service/video-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-card-face',
  templateUrl: './card-face.component.html',
  styleUrls: ['./card-face.component.css']
})
export class CardFaceComponent implements OnInit, OnDestroy {

  imgSCAN = '../../../../../assets/image/scan.png'
  register: string = ''
  overCanvas: any

  data: ImageModel = { nameImg: '', imgUrl: '' };

  listEvents: Array<any> = []
  listExpressions: any = []

  @Input() id_document: any

  constructor(private idUserService: IdUserService, private firebaseService: FirebaseConnectService,
              private faceApiService: FaceApiService, private videoServices: VideoServices,
              private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.listenerEvents()

    this.idUserService.id_document.subscribe(data => {
      this.id_document = data
      this.firebaseService.getImage(this.id_document).subscribe(user => {
        if (typeof user === 'undefined') {
          this.data = { nameImg: '', imgUrl: '' };
          this.register = 'Usuario no registrado'
          return
        }
        this.data = user
        this.register = 'Usuario registrado'
        //console.log('USUARIO: ', this.data);
      })
    })
  }

  ngOnDestroy(): void {
    this.listEvents.forEach(event => { event.unsubscribe() });
  }

  listenerEvents = () => {
    const observer1$ = this.videoServices.callBackAi
                      .subscribe(({ resizedDetections, displaySize, expressions, videoElement }) => {
                        resizedDetections = resizedDetections || null
                        if(resizedDetections) {
                          this.listExpressions = _.map(expressions, (value, name) => {
                            return {value, name}
                          })
                          this.createCanvasPreview(videoElement)
                          this.drawFace(resizedDetections, displaySize)
                        }
                      })

    this.listEvents = [observer1$]
  }

  drawFace = (resizedDetections, displaySize) => {
    const { globalFace } = this.faceApiService

    this.overCanvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
    globalFace.draw.drawFaceLandmarks(this.overCanvas, resizedDetections)
  }

  createCanvasPreview = (videoElement: any) =>{
    if(!this.overCanvas) {
      const { globalFace } = this.faceApiService
      this.overCanvas = globalFace.createCanvasFromMedia(videoElement.nativeElement)
      this.renderer.setProperty(this.overCanvas, 'id', 'new-canvas-preview')
      const elementPreview = document.querySelector('.canvas-preview')
      this.renderer.appendChild(elementPreview, this.overCanvas)
    }
  }
}
