import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { t } from '@angular/core/src/render3';
import { CrearviajeProvider } from '../../providers/crearviaje/crearviaje';
import { UrlProvider } from '../../providers/url/url';
import { Fotografia } from '../../app/Fotografia';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FotosviajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fotosviaje',
  templateUrl: 'fotosviaje.html',
})
export class FotosviajePage {

  NomUsu: string;
  publicacion:string []=[];
  puntosruta: number;
  rol: string;
  descripcion:string;
  web:string;
  nota:number;
  positivo:string;
  negativo:string;
  ruta:string;
  portada:boolean;
  Idfoto:number;
  foto:string;
  idpublicacion:number;
  file:File;
  imagen:string;
  listafotos:number []=[1];
  // CAMPOS DE LA FOTOGRAFIA
  listaIdfoto: number[]=[];
  listafoto: string[]=[];
  listadescripcion: string[]=[];
  listarol: string[]=[];
  listaweb: string[]=[];
  listanota: number[]=[];
  listapositivo: string[]=[];
  listanegativo: string[]=[];
  listaportada: boolean[]=[];
  listaruta: string[]=[];
  //idpublicacion:number;
 /* fotografia={Idfoto:this.Idfoto, Foto: this.foto, Descripcion: this.descripcion,
  Rol: this.rol, Web: this.web, Nota: this.nota, Positivo: this.positivo, Negativo: this.negativo, 
  Portada: this.portada, Ruta: this.ruta, Idpublicacion: this.idpublicacion}*/

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public CrearviajeProvider: CrearviajeProvider,public UrlProvider: UrlProvider ) {
   
    this.NomUsu= navParams.get('Nom');
    this.publicacion= navParams.get('Publi');
    this.puntosruta= navParams.get('Puntos');
    console.log(this.NomUsu);
    console.log(this.publicacion);
    console.log(this.puntosruta);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotosviajePage');
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
     this.imagen =reader.result.toString();
   }

    this.Subircontenedor();

 }

 Subircontenedor(){
    this.UrlProvider.subirImgPubli(this.file.name, this.file);
   // this.fotografia.Foto= this.file.name;
 }





  Subirpublicacion(){
    let fotografia={Idfoto:this.Idfoto, Foto: this.foto, Descripcion: this.descripcion,
      Rol: this.rol, Web: this.web, Nota: this.nota, Positivo: this.positivo, Negativo: this.negativo, 
      Portada: this.portada, Ruta: this.ruta, Idpublicacion: this.idpublicacion}
    fotografia.Idpublicacion= 10;
 //   this.fotografia.Idpublicacion= this.idpublicacion;
    for(var i=0; i < this.listafotos.length; i++){
        fotografia.Idfoto= i+10;
        fotografia.Foto= "hola";
        fotografia.Descripcion= "this.listadescripcion[i]";
        fotografia.Rol= "this.listarol[i]";
        fotografia.Web= "this.listaweb[i]";
        fotografia.Nota= this.listanota[i];
        fotografia.Positivo= "this.listapositivo[i]";
        fotografia.Negativo= "this.listanegativo[i]";
        fotografia.Ruta= this.listaruta[i];
        fotografia.Portada= this.listaportada[i];
        console.log(fotografia);
      //  this.UrlProvider.SubirFoto(this.fotografia);
      this.http.post<any>("http://localhost:3000/api/fotografias/", fotografia).subscribe();
}
  
  }

  PonFoto(){
    this.listafotos.push(1);
    console.log(this.listafotos);
    console.log(this.listarol);
    console.log(this.listaruta);
    console.log(this.listadescripcion);
    console.log(this.listaweb);
    console.log(this.listanota);
    console.log(this.listapositivo);
    console.log(this.listanegativo);
    console.log(this.listaportada);

    }

  Continuar(){

    let Nombreusuario = { Nom:this.NomUsu };
    let publicaciones={Publi:this.publicacion};
    let numruta= {Puntos:this.puntosruta}

  }


}
