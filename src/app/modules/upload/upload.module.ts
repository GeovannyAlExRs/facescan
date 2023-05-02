import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanPageComponent } from '@modules/scan/page/scan-page/scan-page.component';
import { SharedModule } from '@shared/shared.module';
import { UploadRoutingModule } from './upload-routing.module';



@NgModule({
  declarations: [
    ScanPageComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    SharedModule
  ]
})
export class UploadModule { }
