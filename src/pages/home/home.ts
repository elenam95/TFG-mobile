import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import {LoginPage} from '../login/login';
import {CrearcuentaPage} from '../crearcuenta/crearcuenta';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  Login(){
    console.log("HOla");
    this.navCtrl.push(LoginPage);
  }
  Registrarse(){
    console.log("");
    this.navCtrl.push(CrearcuentaPage);
  }

}
