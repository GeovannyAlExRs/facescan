import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadPageComponent } from './page/upload-page/upload-page.component';


const routes: Routes = [
  {path: '', component: UploadPageComponent, outlet: 'child'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
