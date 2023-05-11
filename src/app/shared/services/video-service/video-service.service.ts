import { EventEmitter, Injectable } from '@angular/core';
import { FaceApiService } from '../face-api/face-api.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class VideoServices {

  callBackAi: EventEmitter<any> = new EventEmitter<any>();

  constructor(private faceApiService: FaceApiService) {}

  getLandMark = async (videoElement: any) => {
    if(videoElement.nativeElement) {
      const { globalFace } = this.faceApiService
      const { videoWidth, videoHeight } = videoElement.nativeElement
      const displaySize = { width: videoWidth, height: videoHeight }
      //console.log('Display Size: ', displaySize);

      const detectionFaces = await globalFace.detectSingleFace(videoElement.nativeElement, new globalFace.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceDescriptor().withFaceExpressions()

      try {
        const landmarks = await detectionFaces['landmarks']
        const expressions = detectionFaces['expressions']

        const eyeLeft = landmarks.getLeftEye();
        const eyeRight = landmarks.getRightEye();
        const eyes = {
          left: [_.head(eyeLeft), _.last(eyeLeft)],
          right: [_.head(eyeRight), _.last(eyeRight)],
        };

        const resizedDetections = globalFace.resizeResults(detectionFaces, displaySize);
        //console.log('resizedDetections: ', resizedDetections);

        this.callBackAi.emit({ resizedDetections, displaySize, expressions, eyes, videoElement })
      } catch (error) {
        console.log('landmarks and expressions not detect...!!!');
        //console.log('ERROR: ', error);
      }
    }
  }
}
