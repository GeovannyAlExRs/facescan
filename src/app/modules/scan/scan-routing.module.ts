import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScanPageComponent } from './page/scan-page/scan-page.component';


const routes: Routes = [
  {path: '', component: ScanPageComponent, outlet: 'child'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScanRoutingModule { }
