import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {PerfilPage} from '../perfil/perfil';
import { AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';


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
  res:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
                              public alertCtrl: AlertController, public UrlProvider: UrlProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  

  Autentificar(){
    console.log('entra funcioon autentificar');
   this.res= this.UrlProvider.getUsuarios.toString();
    console.log('res:'+this.res);
    this.http.get<any>(this.UrlProvider.getUsuarios + this.nombre).subscribe(
      usuario => {


        if (usuario != null){
              console.log('hay un usuario');
     
              if (usuario.NomUsu ==this.nombre && usuario.Pass == this.pass ){
                  console.log('coinciden');
                  let Nombreusuario = { Nom:this.nombre };
                  // Abre la pagina perfil y le pasa el parametro NomUsu
                  this.navCtrl.push(PerfilPage, {Nom: Nombreusuario.Nom} );
              } else {
                  console.log("NO coinciden");
                  const alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'El usuario o contraseña son incorrectos',
                    buttons: ['OK']
                  });
                  alert.present();
             } 
        }   


      },
       (err)=> {
            console.log("NO existe este usuario");
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'El usuario no existe',
              buttons: ['OK']
            });
            alert.present();
             //this.mensaje = 'usuario no encontrado';
         }   
      
    );

  }


}
