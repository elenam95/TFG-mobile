import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http'; 
import { t } from '@angular/core/src/render3';
import {CambiarcontraseñaPage} from '../cambiarcontraseña/cambiarcontraseña';
import { AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/Observable';
import {ComprobarInputsProvider} from '../../providers/comprobar-inputs/comprobar-inputs';

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
  fotoanterior: string;
  ExisteNomUsu:boolean;
  antiguoNomUsu: string;

  //guardamos datos de los cambios
  file: File; //file.name nombre de la foto nueva, cuando el usuario quiera cambiar de foto
  
  usuario = { NomUsu:this.nomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu, Perfil: this.perfil};
  


  private APIUrl = 'http://localhost:3000/api/usuarios'  //base de la url 
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
                              private http2:Http, public alertCtrl: AlertController, public UrlProvider: UrlProvider,
                              public ComprobarInputsProvider: ComprobarInputsProvider ) {
     // recoge los datos de la pagina anterior
     this.nomUsu= navParams.get('Nom');
     console.log(this.nomUsu);
     this.antiguoNomUsu= this.nomUsu;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
    
    
    //Descargar datos del usuario 
    this.UrlProvider.getUsuario(this.nomUsu).subscribe(
      usu =>{
              this.usuario = usu;
              console.log(this.usuario);
              this.fotoanterior = this.usuario.Fotousu;
              console.log(this.fotoanterior);
              //Descargamos la foto del usuario
              this.UrlProvider.getImgUsu(this.usuario.Fotousu).subscribe(
                response => {
                  this.Cargarfotousu(response);
                  console.log (this.usuario.Perfil);
                  this.perfil= this.usuario.Perfil;
                  console.log (this.perfil);
                  
                });


      }
    );

    if (this.usuario.Rol == 'Empresa'){
      console.log('es una empresa');
      this.selrol=true;
      this.rol='Empresa'
    }
    else 
    {
      console.log('no es una empresa');
      this.selrol=false;
      this.rol='Persona';
    }

  }

  checkboxRol(e){
    this.selrol= e.target.checked;
    console.log(this.selrol);

    if (this.selrol == true){
      console.log('es una empresa');
      this.rol='Empresa;'
    }
    else 
    {
      console.log('no es una empresa');
      this.rol='Persona';
    }
  }
  checkboxPerfil(e){
    this.perfil= e.target.checked;
    console.log(this.perfil);
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
    //Comprobar si existe nombre fotousu
    this.UrlProvider.getImgUsu(this.file.name).subscribe(
      res => {
                if(res!= null){
                  console.log("Foto ya existente")
                  const alert = this.alertCtrl.create({
                          title: 'Error',
                          subTitle: 'Ya existe una fotografia con este nombre, porfavor modifique el nombre antes de subirlo',
                          buttons: ['OK']
                         });
                  alert.present();
                }
      }, (err) =>{
                 console.log("Foto no existente")
                 const reader = new FileReader();
                 reader.readAsDataURL(this.file);
                 reader.onload =() => {
                   console.log ('ya');
                   this.imagenusu =reader.result.toString();
                 }
              
                 this.Subirfotousu();
          });    

 }


  Subirfotousu (){ 
    // Subir foto al contenedor de imagenes 

    this.UrlProvider.SubirImgUsu(this.file.name, this.file).subscribe( 
      () => {
              console.log('subida a contenedor')
             });
   // Subir nombre de la foto a la base de datos 
      this.usuario.Fotousu = this.file.name;
      console.log ('nombre nueva foto'+ this.usuario.Fotousu);
      console.log(this.usuario);
      this.UrlProvider.ModificarUsu( this.usuario).subscribe(()=> console.log("Usuario modificado"));

   // Eliminar antigua foto contenedor si no es foto por defecto
      if(this.fotoanterior != "pordefecto.png"){
             this.UrlProvider.EliminarImgUsu(this.fotoanterior).subscribe( ()=> console.log("Foto eliminada"));
       }
     this.fotoanterior= this.usuario.Fotousu;

 }

 
 ComprobarNomUsu(){
  console.log(this.nomUsu);
  this.UrlProvider.ExisteUsuario(this.nomUsu).subscribe(
    res => {
            if(this.nomUsu == this.antiguoNomUsu){
              this.ExisteNomUsu = false;
              console.log("el mismo que antes, ok")

            }else {
                     if (res.exists == true){
                         console.log("NomUsu ya existe")
                         this.ExisteNomUsu=true;

                    } else{
                          console.log("NomUsu no existe")
                           this.ExisteNomUsu=false;
                     }
            }
    } 
  );
 }


 ComprobarCamposVacios(){
  let res;
   res = this.ComprobarInputsProvider.Configuracion(this.nomUsu, this.nombre);
   if(res == "OK"){
     console.log("OK")
     this.Cambiardatos();
   }
}

 Cambiardatos(){ 
  this.UrlProvider.ExisteUsuario(this.nomUsu).subscribe(
    res => {
            if(this.nomUsu == this.antiguoNomUsu){
              this.ExisteNomUsu = false;
              console.log("el mismo que antes, ok")
              this.ModificarUsuario(false);

            }else {
                     if (res.exists == true){
                         console.log("NomUsu ya existe")
                         this.ExisteNomUsu=true;
                         const alert = this.alertCtrl.create({
                          title: 'Error',
                          subTitle: 'El Nombre de Usuario ya existe',
                          buttons: ['OK']
                          });
                          alert.present();

                    } else{
                          console.log("NomUsu no existe")
                          this.ModificarUsuario(true);
                     }
            }
    });
 
 }

 ModificarUsuario(Eliminar: boolean){
  
  this.usuario.NomUsu=this.nomUsu;
  this.usuario.Nombre=this.nombre;
  this.usuario.Rol= this.rol;
  this.usuario.Perfil= this.perfil;
  console.log(this.usuario);
/*
  //Modificamos usuario
    this.UrlProvider.ModificarUsu( this.usuario).subscribe(
      ()=> {
               console.log ("datos de usuarios modificados")
               if(Eliminar == true){
                 this.UrlProvider.EliminarUsuario(this.antiguoNomUsu).subscribe(() => console.log("antiguo usu elminiado"));
               }
               
               this.antiguoNomUsu= this.usuario.NomUsu;
               console.log(this.antiguoNomUsu)
      });*/

}

 Cambiarpass(){
  let usuarios={
    usu: this.usuario
  }
  
  this.navCtrl.push(CambiarcontraseñaPage, {usu: usuarios.usu});
 }


}
