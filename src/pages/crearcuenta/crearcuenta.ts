import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {PerfilPage} from '../perfil/perfil';

/**
 * Generated class for the CrearcuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearcuenta',
  templateUrl: 'crearcuenta.html',
})
export class CrearcuentaPage {
  nombre: string;
  pass:string;
  mail:string;;
  nomUsu:string;
  rol:string;
  private APIUrl = 'http://192.168.0.11:3000/api/usuarios'  //base de la url 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearcuentaPage');
  }

  Crearcuenta()
  {
    let usuario = { NomUsu:this.nomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass};
    this.http.get<any>(this.APIUrl + '/' + this.nomUsu).subscribe(usuario => {if (usuario != null){
      console.log('usuario ya existe');
      
    }
    else {
      this.http.post<any>(this.APIUrl, usuario).subscribe();
      console.log("usuario registrado");
      this.navCtrl.push(PerfilPage);
      
      
    }
  }
    );

  }
 
}
