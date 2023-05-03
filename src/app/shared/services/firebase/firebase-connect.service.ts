import { Injectable } from '@angular/core';
import { ImageModel } from '@core/model/image.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

import { FileItems } from '@core/file.items';

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class FirebaseConnectService {

  private FILE_IMAGE = 'img';
  progress: any;
  private firestoreCollection: AngularFirestoreCollection<ImageModel>

  constructor(private firestore: AngularFirestore) {
    console.log('CONECTANDO A FIREBASE, ', firestore);
    this.firestoreCollection = firestore.collection<ImageModel>('faceUser')
  }

  getImageFirebase() {

  }

  loadImageFirebase(imgFileItem: FileItems, imageData: ImageModel) {
    console.log('LOAD DATA IMG FileItems: ', imgFileItem, ' ImageModel: ', imageData);

    const storage = getStorage()
    let itemFile = imgFileItem
    let imageTrim = imageData.nameImg

    const storageRef = ref(storage, `${this.FILE_IMAGE}/${imageTrim.replace(/ /g, '')}`)
    const uploadTask = uploadBytesResumable(storageRef, itemFile.file)

    uploadTask.on('state_changed', (snapshot) => {
      this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('PROGRESS: ', this.progress);

    }, (error) => {
      console.log('Error al subir los archivos ', error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        itemFile.url = downloadURL

        this.saveImageFirebase({nameImg: imageData.nameImg, imgURL: itemFile.url})
      })
    })
  }

  async saveImageFirebase(imgData: { nameImg: string, imgURL: string}): Promise<any> {
    try {
      return await this.firestore.collection('faceUser').add(imgData)
    } catch (error) {
      console.log('Error: ', error);
    }
  }

}
