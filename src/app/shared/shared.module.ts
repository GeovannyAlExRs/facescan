import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardUploadComponent } from './components/card-upload/card-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImgDefaultDirective } from './directives/img-default.directive';

@NgModule({
  declarations: [
    SideBarComponent,
    CardListComponent,
    CardUploadComponent,
    ImgDefaultDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SideBarComponent,
    CardListComponent,
    CardUploadComponent,
    ImgDefaultDirective
  ]
})
export class SharedModule { }
