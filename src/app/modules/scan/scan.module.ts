import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanPageComponent } from './page/scan-page/scan-page.component';
import { SharedModule } from '@shared/shared.module';
import { ScanRoutingModule } from './scan-routing.module';



@NgModule({
  declarations: [ScanPageComponent],
  imports: [
    CommonModule,
    ScanRoutingModule,
    SharedModule
  ]
})
export class ScanModule { }
