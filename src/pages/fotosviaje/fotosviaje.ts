import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { t } from '@angular/core/src/render3';
import { CrearviajeProvider } from '../../providers/crearviaje/crearviaje';
import { UrlProvider } from '../../providers/url/url';


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
  portada:string;
  Idfoto:number;
  foto:string;
  idpublicacion:number;
  file:File;
  imagen:string;

  fotografia={Idfoto:this.Idfoto, Foto: this.foto, Descripcion: this.descripcion, Rol: this.rol, Web: this.web, Nota: this.nota, Positivo: this.positivo, Negativo: this.negativo, Portada: this.portada, puntoruta: this.ruta, Idpublicacion: this.idpublicacion}

  constructor(public navCtrl: NavController, public navParams: NavParams, public CrearviajeProvider: CrearviajeProvider,public UrlProvider: UrlProvider ) {
   
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
 }





  Subirpublicacion(){
      
  }

  Continuar(){

    this.puntosruta--;
    console.log(this.puntosruta);
    let Nombreusuario = { Nom:this.NomUsu };
    let publicaciones={Publi:this.publicacion};
    let numruta= {Puntos:this.puntosruta}

    if(this.puntosruta!= 0){
    // Abre la pagina perfil y le pasa el parametro NomUsu
     this.navCtrl.push(FotosviajePage, {Nom: Nombreusuario.Nom, Publi: publicaciones.Publi, Puntos: numruta.Puntos });
    } else{
      console.log("abrira la pag recomendacion");
    }
     }


}
