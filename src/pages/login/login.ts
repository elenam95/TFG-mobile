import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {PerfilPage} from '../perfil/perfil';
import { AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { Usuario } from '../../app/Usuario';
import {LoginProvider} from '../../providers/login/login';
import {ComprobarInputsProvider} from '../../providers/comprobar-inputs/comprobar-inputs';


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
  NomUsu: string;
  mail:string;
  fotousu:string;
  perfil:boolean;
  rol: string;
  usu: Usuario;
  resultado:string;

 // usu = { NomUsu:this.NomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu, Perfil: this.perfil};
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
                              public alertCtrl: AlertController, public UrlProvider: UrlProvider,
                              public LoginProvider: LoginProvider, public ComprobarInputsProvider: ComprobarInputsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ComprobarCamposRellenos(){
    let res;
    res = this.ComprobarInputsProvider.Login(this.nombre, this.pass);
    if (res == "OK"){
      this.Autentificar();
    }
   
  }

  Autentificar(){
    console.log('entra funcioon autentificar');
    

    this.UrlProvider.getUsuario(this.nombre).subscribe(
      usuario =>{

                  this.usu = usuario;
                  console.log(this.usu);
                  if (usuario != null){

                        console.log('hay un usuario');

                        if (usuario.NomUsu == this.nombre && usuario.Pass == this.pass ){

                              console.log('coinciden');
                              let Nombreusuario = { Nom:this.nombre };
                              // Abre la pagina perfil y le pasa el parametro NomUsu
                              this.navCtrl.push(PerfilPage, {Nom: Nombreusuario.Nom} );
            
                        }
                        else{ 
                              console.log('no coinciden');
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
         
                    } 

      );
  }


}
