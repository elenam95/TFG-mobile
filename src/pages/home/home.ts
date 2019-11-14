import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import {LoginPage} from '../login/login';
import {CrearcuentaPage} from '../crearcuenta/crearcuenta';
import { UrlProvider } from '../../providers/url/url';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public UrlProvider: UrlProvider) {

  }

  Login(){
    console.log("HOla");
    this.UrlProvider.getUsuarios().subscribe(
      usuario => {
        console.log(usuario);
      }
    );

  
    this.navCtrl.push(LoginPage);
  }
  Registrarse(){
    console.log("");
    this.navCtrl.push(CrearcuentaPage);
  }



}
