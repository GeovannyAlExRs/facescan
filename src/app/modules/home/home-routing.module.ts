import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@modules/home/page/home-page/home-page.component';

const routes: Routes = [
  //{path: '', component: HomePageComponent}
  {path: 'home', loadChildren: () => import('@modules/main/main.module').then(m => m.MainModule)},
  {path: 'upload', loadChildren: () => import('@modules/upload/upload.module').then(m => m.UploadModule)},
  {path: 'scan', loadChildren: () => import('@modules/scan/scan.module').then(m => m.ScanModule)},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
