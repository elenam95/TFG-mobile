import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
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
