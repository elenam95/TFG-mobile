import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {PerfilPage} from '../perfil/perfil';
import { AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http'; 

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
  perfil:boolean;
  fotousu: string;
  file: File;
  imagenusu: string;
 

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
                              public alertCtrl: AlertController, public UrlProvider: UrlProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearcuentaPage');

    //Descargar foto por defecto 
    this.UrlProvider.getDescargarFotoUsu("pordefecto.png").subscribe(
      response => {
        this.Cargarfotousu(response);
        this.fotousu= "pordefecto.png";     
      });
  }


  Cargarfotousu(response: Response){

    const blob = new Blob([response.blob()], {type: 'image/jpg'});
    //Colocamos la imagen que esta en blob en la carpeta img correspondiente
    const reader= new FileReader();
    reader.addEventListener('load', ()=>{
      // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
      this.imagenusu = reader.result.toString();
    },false);
  
     // Aqui es donde ordeno que se lea la imagen y se prepare la URL
     if (blob) {
      reader.readAsDataURL(blob);
  }
  
   }

  Activarinput(){
    // hacemos click en el boton que esta invisible para el usuario
    document.getElementById('inp').click();
  }


  Mostrar($event){  
    //Función que coge el fichero seleccionado y leerlo mediante FileReader para dejar su información en la variable foto, de donde posteriormente se alimentara la imagen 
   this.file = $event.target.files[0];
   console.log ('fichero' +this.file.name);
   const reader = new FileReader();
   reader.readAsDataURL(this.file);
   reader.onload =() => {
     console.log ('ya');
     this.imagenusu =reader.result.toString();
   }
   this.fotousu= this.file.name;

 }


  Crearcuenta(){
    let usuario = { NomUsu:this.nomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu, Perfil: this.perfil};
    console.log(usuario);
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
                          this.UrlProvider.SubirUsu(usuario).subscribe(
                            () => {
                                   console.log('usuario subido')
                                   if (this.fotousu != "pordefecto.png"){
                                    this.UrlProvider.SubirImgUsu(this.file.name, this.file).subscribe(
                                      () => {
                                               console.log('subida a contenedor')         
                                           });
                                  }
                                   let Nombreusuario ={Nom:this.nomUsu}
                                      // Abre la pagina perfil y le pasa el parametro NomUsu
                                       this.navCtrl.push(PerfilPage, {Nom: Nombreusuario.Nom});
                                 
                            });

                  }

                );

        }

    );
 

  }

}
