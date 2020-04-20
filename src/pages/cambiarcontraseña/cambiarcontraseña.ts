import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { UrlProvider } from '../../providers/url/url';
import {ComprobarInputsProvider} from '../../providers/comprobar-inputs/comprobar-inputs';

/**
 * Generated class for the CambiarcontraseñaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cambiarcontraseña',
  templateUrl: 'cambiarcontraseña.html',
})
export class CambiarcontraseñaPage {
 
  nomUsu: string;
  nombre: string;
  pass:string;
  mail:string;;
  rol:string;
  fotousu:string;
  usuario = { NomUsu:this.nomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu};

  nuevapass:string;
  nuevapass2:string;

  private APIUrl = 'http://localhost:3000/api/usuarios'  //base de la url 

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private http:HttpClient, public UrlProvider :UrlProvider,
               public ComprobarInputsProvider: ComprobarInputsProvider  ) {
    this.usuario= navParams.get('usu');
     console.log(this.usuario);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CambiarcontraseñaPage');
    
  }

  ComprobarCamposVacios(){
    let res;
    res = this.ComprobarInputsProvider.CambiarContraseña(this.pass, this.nuevapass, this.nuevapass2);
    if (res == "OK"){
      this.Cambiarpass();
    }
  }

  Cambiarpass(){
    if (this.usuario.Pass== this.pass) {
      console.log('contraseña actual correcta');
      if(this.nuevapass== this.nuevapass2){
        console.log('coinciden contraseñas');
        this.usuario.Pass=this.nuevapass;
        this.UrlProvider.ModificarUsu(this.usuario).subscribe(()=> console.log('contraseña modificada'));
      //  this.http.patch(this.APIUrl, this.usuario).subscribe(()=> console.log('contraseña modificada'));
        
      }
      else{
        console.log('no coinciden contraseñas');
      }

    }
    else {
      console.log('contraseña actual no correcta');

    }
    
  }

  

}
