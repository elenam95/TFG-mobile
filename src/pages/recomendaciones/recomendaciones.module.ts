import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecomendacionesPage } from './recomendaciones';

@NgModule({
  declarations: [
    RecomendacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(RecomendacionesPage),
  ],
})
export class RecomendacionesPageModule {}
