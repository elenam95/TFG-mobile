import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicacionPage } from './publicacion';

@NgModule({
  declarations: [
    PublicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicacionPage),
  ],
})
export class PublicacionPageModule {}
