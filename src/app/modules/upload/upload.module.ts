import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadPageComponent } from './page/upload-page/upload-page.component';

@NgModule({
  declarations: [
    UploadPageComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    SharedModule
  ]
})
export class UploadModule { }
