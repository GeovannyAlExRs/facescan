import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ImageModel } from '@core/model/image.model';
import { FirebaseConnectService } from '@shared/services/firebase/firebase-connect.service';

import * as faceapi from 'face-api.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-upload',
  templateUrl: './card-upload.component.html',
  styleUrls: ['./card-upload.component.css']
})
export class CardUploadComponent implements OnInit{

  imgElement = ''
  imgSCAN = '../../../../../assets/image/scan.png'
  image: any
  imgData: ImageModel[] = []
  imgProcess: any;
  btnActive = true;
  fileImg: any;

  imageForm = this.fb.group({name: ['', [Validators.required]], imgFile: ['']})

  @ViewChild('imageFile', { static: true }) imageFile!: ElementRef;

  constructor(private fb: FormBuilder, private renderer: Renderer2, private _firebase: FirebaseConnectService) {}

  ngOnInit(): void {}

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      console.log('IMAGEN', event.target.files);

      var containerImage = document.createElement('div');
      var status = document.createElement('p');
      var icon = document.createElement('i');
      var elementImage = document.createElement('img');

      this.fileImg = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileImg[0]);

      reader.onloadend = (event: any) => {
        this.imgSCAN = event.target.result;
        this.imgElement = event.target.result;
        elementImage.src = `${this.imgElement}`;
        this.image = { file: this.fileImg[0] }
        //console.log('imgSCAN: ', this.imgSCAN, ' SRC: ', elementImage.src, ' this.image: ', this.image);
      }

      this.btnActive = false;

      containerImage.classList.add('containerImage');

      elementImage.crossOrigin = 'anonymous';

      icon.classList.add('uil');
      icon.classList.add('uil-spinner');
      icon.classList.add('uil-spinner-alt');

      /*icon.classList.add('fa-spinner');
      icon.classList.add('fa-pulse');*/

      status.classList.add('status');

      status.appendChild(icon)

      containerImage.appendChild(status);

      this.imgProcess = elementImage;

      this.renderer.appendChild(this.imageFile.nativeElement, containerImage)
      this.processFace(this.imgProcess, containerImage)
    }
  }

  processFace = async (image: any, imageContainer: any) => {

    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');

    const detection = await faceapi.detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    console.log("DETECTOR FACIAL: ", detection);


    if (typeof detection === 'undefined') {
      imageContainer.querySelector('.status').innerText = 'No se pudo procesar la imagen';
      imageContainer.querySelector('.status').style.background = '#ae052c';

      setTimeout(() => {
        imageContainer.querySelector('.status').innerText = '';
        this.imgSCAN = '../../../../../assets/image/scan.png';
        this.imageForm.reset();
      }, 3500);
      this.btnActive = true;
    } else {
      imageContainer.querySelector('.status').innerText = 'Imagen Procesada';
      imageContainer.querySelector('.status').style.background = '#078565';
      setTimeout(() => { this.onSubmit() }, 2000);

      setTimeout(() => {
        imageContainer.querySelector('.status').innerText = '';
      }, 4500);
    }
  }

  onSubmit() {
    Swal.fire({
      title: 'Ingresa el nombre de la imagen',
      input: 'text',
      inputAttributes: { autocapitalize: 'off' },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        let loadImgData: any = { nameImg: result.value }

        this._firebase.loadImageFirebase(this.image, loadImgData);

        Swal.fire({
          icon: 'success',
          title: 'Imagen se cargo con exito!',
          text: 'En breve aparecera la imagen cargada'
        }).then((result) => {
          if (result) {
            this.imgSCAN = '../../../../../assets/image/scan.png';
            this.imageForm.reset();
          }
        })
      } else {
        if (!result.isConfirmed && !result.value) {
          location.reload();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debe ingresar el nombre',
            confirmButtonText: 'OK'
          }).then((result) => { this.imageForm.reset() })
        }
      }
    })
  }
}
