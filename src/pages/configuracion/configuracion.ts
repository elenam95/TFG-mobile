import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {
  NomUsu: string;
  file: File; //file.name nombre de la foto nueva, cuando el usuario quiera cambiar de foto
  foto:string; //lo necesitamos para leer el archivo de la foto
  nombre: string;
  pass:string;
  mail:string;;
  rol:string;
  fotousu:string; //dentro de la clase usuario (guardara el nombre que descargue de la base de datos)
  usuario = { NomUsu:this.NomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu};
  


  private APIUrl = 'http://localhost:3000/api/usuarios'  //base de la url 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
     // recoge los datos de la pagina anterior
     this.NomUsu= navParams.get('Nom');
     console.log(this.NomUsu);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');

    //Descargar datos del usuario 
    this.http.get<any>(this.APIUrl + '/' + this.NomUsu).subscribe(usu =>{
      this.usuario = usu;
      console.log(this.usuario);
    });




  }
  Mostrar($event){  
    //Función que coge el fichero seleccionado y leerlo mediante FileReader para dejar su información en la variable foto, de donde posteriormente se alimentara la imagen 
   this.file = $event.target.files[0];
   console.log ('fichero' +this.file.name);
   const reader = new FileReader();
   reader.readAsDataURL(this.file);
   reader.onload =() => {
     console.log ('ya');
     this.foto =reader.result.toString();
   }

 }

  Subirfotousu (){ 
    // Subir foto al contenedor de imagenes 
 const formData: FormData = new FormData(); //utilizamos objeto de la clase formData
 formData.append(this.file.name, this.file); //le pasamos nombre fichero y el propio fichero
 // este objeto será lo que enviamos posteriormente al post del contenedor de imagenes
 //enviamos la foto a nuestro contenedor fotospublicaciones
 this.http.post('http://localhost:3000/api/imagenes/fotosusuarios/upload', formData).subscribe(() => console.log('subida a contenedor'));
 // Subir nombre de la foto a la base de datos 
 this.usuario.Fotousu = this.file.name;
 console.log ('nombre nueva foto'+ this.usuario.Fotousu);
 console.log(this.usuario);
 this.http.patch(this.APIUrl, this.usuario).subscribe(()=> console.log ("foto subida a la base de datos usu"));

 }

}
