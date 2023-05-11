import { Injectable } from '@angular/core';
import { FaceApiService } from '../face-api/face-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessFaceService {

  idImg: any;
  faceMatcher: any;
  imgDescriptors: any = [];

  constructor(private faceApiService: FaceApiService) { }

  processImgFace = async (image: any, id: string) => {
    const { globalFace } = this.faceApiService

    const detectionFaces = await globalFace.detectSingleFace(image, new globalFace.TinyFaceDetectorOptions())
      .withFaceLandmarks().withFaceDescriptor()
      //console.log('detectionFaces: ', detectionFaces);

      if (typeof detectionFaces === 'undefined') return;

      this.imgDescriptors.push({ id: id, detectionFaces });
      //console.log('imgDescriptors: ', this.imgDescriptors);

      this.faceMatcher = new globalFace.FaceMatcher(
                            this.imgDescriptors.map((faceDescriptor: any) => (
                              new globalFace.LabeledFaceDescriptors(
                                (faceDescriptor.id).toString(), [faceDescriptor.detectionFaces['descriptor']]
                              )
                            )))
      //console.log('faceMatcher: ', this.faceMatcher);
  }

  descriptor(detect: any) {
    if(detect){
      try {
        const bestMatch = this.faceMatcher.findBestMatch(detect['descriptor']);
        this.idImg = bestMatch['_label'];
      } catch (error) {
        //console.log('No detect...!!!');
      }
    }
  }
}
