import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConnectService {

  constructor(private firestore: AngularFirestore) {
    console.log('CONECTANDO A FIREBASE, ', firestore);

   }
}
