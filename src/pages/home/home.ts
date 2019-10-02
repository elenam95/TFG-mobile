import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import {LoginPage} from '../login/login';


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

}
