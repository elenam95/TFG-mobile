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
import {CambiarcontraseñaPageModule} from '../pages/cambiarcontraseña/cambiarcontraseña.module';
import {CrearmiviajePageModule} from '../pages/crearmiviaje/crearmiviaje.module';
import {FotosviajePageModule} from '../pages/fotosviaje/fotosviaje.module';
import {RecomendacionesPageModule} from '../pages/recomendaciones/recomendaciones.module';
import {PublicacionPageModule} from '../pages/publicacion/publicacion.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { UrlProvider } from '../providers/url/url';
import { LoginProvider } from '../providers/login/login';
import { CrearviajeProvider } from '../providers/crearviaje/crearviaje';
import { PublicacionProvider } from '../providers/publicacion/publicacion';
import { PerfilProvider } from '../providers/perfil/perfil';
import { ComprobarInputsProvider } from '../providers/comprobar-inputs/comprobar-inputs';

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
    CambiarcontraseñaPageModule,
    CrearmiviajePageModule,
    FotosviajePageModule,
    RecomendacionesPageModule,
    PublicacionPageModule,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UrlProvider,
    LoginProvider,
    CrearviajeProvider,
    PublicacionProvider,
    PerfilProvider,
    ComprobarInputsProvider
  ]
})
export class AppModule {}
