import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardUploadComponent } from './components/card-upload/card-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgDefaultDirective } from './directives/img-default.directive';
import { SearchPipe } from './pipe/search/search.pipe';
import { SearchComponent } from './components/search/search.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { CardFaceComponent } from './components/card-face/card-face.component';

@NgModule({
  declarations: [
    SideBarComponent,
    CardListComponent,
    CardUploadComponent,
    ImgDefaultDirective,
    SearchPipe,
    SearchComponent,
    VideoPlayerComponent,
    CardFaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SideBarComponent,
    CardListComponent,
    CardUploadComponent,
    ImgDefaultDirective,
    VideoPlayerComponent,
    CardFaceComponent
  ]
})
export class SharedModule { }
