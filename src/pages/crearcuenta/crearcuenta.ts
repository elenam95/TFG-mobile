import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {PerfilPage} from '../perfil/perfil';
import { AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';

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
  perfil:string;

  
  private APIUrl = 'http://localhost:3000/api/usuarios'  //base de la url 

  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
                              public alertCtrl: AlertController, public UrlProvider: UrlProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearcuentaPage');
  }

  Crearcuenta()
  {
    let usuario = { NomUsu:this.nomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Perfil: this.perfil};
    
    //Consultamos si existe un usuario con este nomUsu
    this.UrlProvider.getUsuario(this.nomUsu).subscribe(
     usuario =>{
                  //Si hay un usuario: mensaje error
                   if (usuario != null){
                      console.log('usuario ya existe');
                      const alert = this.alertCtrl.create({
                           title: 'Error',
                           subTitle: 'El usuario ya existe',
                           buttons: ['OK']
                      });
                      alert.present();
                    }


      },
          //Si el usuario con este nomUsu no existe
        (err)=> {
                console.log("el usuario con nomUsu no existe")
                //Comprobamos que no existe un usuario con el mismo mail
                this.UrlProvider.getMail(this.mail).subscribe(
                  usuario => {
                    //Si existe un usuario con este mail: mensaje error
                            if (usuario != null){
                                console.log('Ya existe un usuario con este e-mail');
                                const alert = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: 'El usuario ya existe',
                                    buttons: ['OK']
                                });
                            alert.present();
                            }  
                  },
                  (err)=> {
                          console.log("vamos a registrar al nuevo usuario");
                          //Creamos el nuevo usuario
                          this.http.post<any>(this.APIUrl, usuario).subscribe();
                          console.log("usuario registrado");
                          let Nombreusuario ={Nom:this.nombre}
                          // Abre la pagina perfil y le pasa el parametro NomUsu
                           this.navCtrl.push(PerfilPage, {Nom: Nombreusuario.Nom}); 

                  }

                );

        

        }




    );
 

  }
  
 
}
