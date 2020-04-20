import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RecomendacionesPage} from '../recomendaciones/recomendaciones';
import {ComprobarInputsProvider} from '../../providers/comprobar-inputs/comprobar-inputs';

/**
 * Generated class for the CrearmiviajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearmiviaje',
  templateUrl: 'crearmiviaje.html',
})
export class CrearmiviajePage {

  NomUsu:string;
  titulo:string;
  duracion: number;
  descripcion:string;
  ruta:string;
  recomendacion:string;
  idpublicacion: number;
  puntos:number;
  puntosruta:string []=[];
  numerosruta:number []=[1];

  publicacion= {Titulo: this.titulo, Descripcion: this.descripcion, Duracion:this.duracion, Ruta:this.ruta, Recomendacion:this.recomendacion, Idpublicacion: this.idpublicacion, IdNomUsu: this.NomUsu}

  constructor(public navCtrl: NavController, public navParams: NavParams, public ComprobarInputsProvider: ComprobarInputsProvider) {
    // recoge los datos de la pagina anterior
    this.NomUsu= navParams.get('Nom');
    console.log(this.NomUsu);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearmiviajePage');
    
  }

  PonRuta(){
    this.numerosruta.push(1);
    console.log(this.numerosruta)
    console.log(this.puntosruta);
  }

  QuitarRuta(i:number){
    if(this.numerosruta.length>=2){
      for(i; i< this.numerosruta.length; i++){
        this.puntosruta[i]= this.puntosruta[i+1];
      }
      this.puntosruta.length= this.puntosruta.length-1;
      this.numerosruta.length= this.numerosruta.length-1;
      
    }
   
  }

  ComprobarCamposVacios(){
    let res;
    res= this.ComprobarInputsProvider.Crearmiviaje(this.titulo, this.duracion, this.puntosruta[0]);
    if (res == "OK"){
      this.Continuar();
    }
  }

  Continuar(){
    this.publicacion.IdNomUsu= this.NomUsu;
    this.publicacion.Titulo= this.titulo;
    this.publicacion.Descripcion= this.descripcion;
    this.publicacion.Duracion= this.duracion;
    this.publicacion.Ruta= ""
    for(var i=0; i < this.puntosruta.length; i++){
        
      this.publicacion.Ruta= this.publicacion.Ruta.concat(this.puntosruta[i].trim()+ ";;");
        console.log(this.publicacion.Ruta);
    }
    console.log(this.publicacion);

    let Nombreusuario = { Nom:this.NomUsu };
    let publicaciones={Publi:this.publicacion};
    // Abre la pagina perfil y le pasa el parametro NomUsu
    this.navCtrl.push(RecomendacionesPage, {Nom: Nombreusuario.Nom, Publi: publicaciones.Publi });

  }



}
