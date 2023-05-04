import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardUploadComponent } from './components/card-upload/card-upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SideBarComponent,
    CardListComponent,
    CardUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SideBarComponent,
    CardListComponent,
    CardUploadComponent
  ]
})
export class SharedModule { }
