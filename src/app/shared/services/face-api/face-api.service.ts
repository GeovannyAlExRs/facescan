import { EventEmitter, Injectable } from '@angular/core';

import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {

  public globalFace: any

  private _modelsForLoad = [
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models',),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
  ]

  callbackModels: EventEmitter<any> = new EventEmitter<any>()

  constructor() {
    this.globalFace = faceapi
    this.LoadModels()
  }

  public LoadModels = () => {
    Promise.all(this._modelsForLoad).then(() => {
      console.log('MODELOS CARGADOS');
      this.callbackModels.emit( true)
    })
  }
}
