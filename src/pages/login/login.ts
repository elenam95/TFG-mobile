import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {PerfilPage} from '../perfil/perfil';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  nombre: string;
  pass:string;
  mensaje:string;
  private APIUrl = 'http://localhost:3000/api/usuarios'  //base de la url 

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Autentificar(){
    console.log('entra funcioon autentificar');
    this.http.get<any>(this.APIUrl + '/' + this.nombre).subscribe(
      usuario => {if (usuario != null){
      console.log('hay un usuario');

      if (usuario.NomUsu ==this.nombre && usuario.Pass == this.pass ){
        console.log('coinciden');
        let Nombreusuario ={
          Nom:this.nombre
        }
        // Abre la pagina perfil y le pasa el parametro NomUsu
        this.navCtrl.push(PerfilPage, {Nom: Nombreusuario.Nom} );
      }
      

      else {
      console.log("NO coinciden");
      this.mensaje = 'usuario no encontrado';
    } 
    }
      else {
      console.log("NO existe este usuario");
      this.mensaje = 'usuario no encontrado';
    }
  }
    );

  }


}
