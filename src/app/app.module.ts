import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPageModule} from '../pages/login/login.module';
import {CrearcuentaPageModule} from '../pages/crearcuenta/crearcuenta.module';
import {PerfilPageModule} from '../pages/perfil/perfil.module';
import {SubircontenidoPageModule} from '../pages/subircontenido/subircontenido.module';
import {ConfiguracionPageModule} from '../pages/configuracion/configuracion.module';


import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule, 
    CrearcuentaPageModule,
    PerfilPageModule,
    SubircontenidoPageModule,
    ConfiguracionPageModule,
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
