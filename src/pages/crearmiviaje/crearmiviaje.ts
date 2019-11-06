import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  publicacion= {Titulo: this.titulo, Descripcion: this.descripcion, Duracion:this.duracion, Ruta:this.ruta, Recomendacion:this.recomendacion, Idpublicacion: this.idpublicacion}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // recoge los datos de la pagina anterior
    this.NomUsu= navParams.get('Nom');
    console.log(this.NomUsu);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearmiviajePage');
  }

  Continuar(){
    console.log(this.duracion);
    console.log(this.titulo);
    console.log(this.descripcion);
  }

}
