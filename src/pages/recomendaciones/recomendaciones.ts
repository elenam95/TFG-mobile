import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FotosviajePage} from '../fotosviaje/fotosviaje';
/**
 * Generated class for the RecomendacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recomendaciones',
  templateUrl: 'recomendaciones.html',
})
export class RecomendacionesPage {

  NomUsu: string;
  publicacion:string []=[];
  puntosruta: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // recoge los datos de la pagina anterior
    console.log("nueva pag");
    this.NomUsu= navParams.get('Nom');
    this.publicacion= navParams.get('Publi');
    this.puntosruta= navParams.get('Puntos');
    console.log(this.NomUsu);
    console.log(this.publicacion);
    console.log(this.puntosruta);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecomendacionesPage');
  }

  Continuar(){
    let Nombreusuario = { Nom:this.NomUsu };
    let publicaciones={Publi:this.publicacion};
    let numruta= {Puntos:this.puntosruta}
    // Abre la pagina perfil y le pasa el parametro NomUsu
    this.navCtrl.push(FotosviajePage, {Nom: Nombreusuario.Nom, Publi: publicaciones.Publi, Puntos: numruta.Puntos });
  
  }
 
}
