import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http'; 
import { t } from '@angular/core/src/render3';
import {CambiarcontraseñaPage} from '../cambiarcontraseña/cambiarcontraseña';
import { AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  //guardamos datos descargados base de datos
  nomUsu: string;
  nombre: string;
  pass:string;
  mail:string;;
  rol:string;
  perfil:boolean;
  selrol: boolean;//ion-toggle
  fotousu:string; //dentro de la clase usuario (guardara el nombre que descargue de la base de datos)
  imagenusu: string; //necesito cargar foto usu

  //guardamos datos de los cambios
  file: File; //file.name nombre de la foto nueva, cuando el usuario quiera cambiar de foto
  
  usuario = { NomUsu:this.nomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu, Perfil: this.perfil};
  


  private APIUrl = 'http://localhost:3000/api/usuarios'  //base de la url 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
                              private http2:Http, public alertCtrl: AlertController, public UrlProvider: UrlProvider ) {
     // recoge los datos de la pagina anterior
     this.nomUsu= navParams.get('Nom');
     console.log(this.nomUsu);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
    

    //Descargar datos del usuario 
    this.UrlProvider.getUsuario(this.nomUsu).subscribe(
      usu =>{
              this.usuario = usu;
              console.log(this.usuario);

              //Descargamos la foto del usuario 
              this.http2.get('http://localhost:3000/api/imagenes/fotosusuarios/download/' +this.usuario.Fotousu, {responseType: ResponseContentType.Blob} ).subscribe(
                 response => 
                            this.Cargarfotousu(response));
                            console.log (this.usuario.Perfil);
                            this.perfil= this.usuario.Perfil;
                            console.log (this.perfil);

      }
    );



/*
    this.http.get<any>(this.UrlProvider.getUsuarios + this.nomUsu).subscribe(usu =>{
      this.usuario = usu;
      console.log('miramos usuario descargado');
      console.log(this.usuario);
      //Descargamos la foto del usuario 
      this.http2.get(this.UrlProvider.getFotoUsu +this.usuario.Fotousu, {responseType: ResponseContentType.Blob} ).subscribe( response => 
      this.Cargarfotousu(response));
      console.log (this.usuario.Perfil);
      this.perfil= this.usuario.Perfil;
      console.log (this.perfil);
    });*/

    

    if (this.usuario.Rol == 'Empresa'){
      console.log('es una empresa');
      this.selrol=true;
      this.rol='Empresa;'
    }
    else 
    {
      console.log('no es una empresa');
      this.selrol=false;
      this.rol='Persona';
    }

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
    console.log('activar input');
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

   this.Subirfotousu();

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

 myChange($event){
   // Cuando cambiemos el icon-toggle selrol, cambiaremos el rol del usuario
   
    const alert = this.alertCtrl.create({
      title: 'Modificado',
      subTitle: 'Tu información personal ha sido modificada',
      buttons: ['OK']
    });
    alert.present();
    if (this.selrol==true){
      this.selrol=true;
      this.rol='Empresa';
      console.log('Se ha cambiado el selrol a '+this.selrol);
    }
    else{
     this.selrol=false;
     this.rol='Persona';
     console.log('Se ha cambiado el selrol a '+this.selrol);
    }
 }

 cambioperfil($event){
   // Cuando cambiemos el icon-toggle perfil, cambiaremos el perfil usuario privado/público
   //True= perfil privado  y false= perfil público
   console.log('Se ha cambiado el perfil a '+this.perfil);
   const alert = this.alertCtrl.create({
    title: 'Modificado',
    subTitle: 'El estado de tu perfil ha sido modificado',
    buttons: ['OK']
  });
  alert.present();
 }

 Cambiardatos(){ //Cambiar datos personales del usuario
  this.usuario.NomUsu=this.nomUsu;
  this.usuario.Nombre=this.nombre;
  this.usuario.Rol= this.rol;
  this.usuario.Perfil= this.perfil;
  console.log(this.usuario);

  this.http.patch(this.APIUrl, this.usuario).subscribe(()=> console.log ("datos de usuarios modificados"));
 }

 Cambiarpass(){
  let usuarios={
    usu: this.usuario
  }
  
  this.navCtrl.push(CambiarcontraseñaPage, {usu: usuarios.usu});
 }

 showConfirm() {
  
}

}
