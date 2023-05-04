import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageModel } from '@core/model/image.model';
import { FirebaseConnectService } from '@shared/services/firebase/firebase-connect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  imgData: ImageModel[] = []
  loading = false

  constructor(private _firebase: FirebaseConnectService) {}

  ngOnInit(): void {
    this.viewImage()
  }

  viewImage() {
    this.loading = true
    this._firebase.getImageFirebase().subscribe(res => {

      this.imgData = [];
      this.loading = false

      res.forEach((element: ImageModel) => {
        this.imgData.push({ ...element })
      })
      //console.log('DATA: ', this.imgData);
    })
  }

  deleteUserImage(id: any, nameImg: string) {
    console.log("Eliminando imagen");

    Swal.fire({
      icon: 'question',
      title: 'Seguro que desea eliminar el usuario ' + nameImg + '?',
      showCancelButton:true,
      confirmButtonText:'Eliminar',
      allowOutsideClick:false
    }).then((result)=>{
      if (result.isConfirmed) {
        this._firebase.eliminarImagen(id, nameImg);
      }
    })
  }
}
