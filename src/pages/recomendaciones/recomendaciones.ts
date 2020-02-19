import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FotosviajePage} from '../fotosviaje/fotosviaje';
import { UrlProvider } from '../../providers/url/url';
import {HttpClient} from '@angular/common/http';
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

  prueba: string;
  listaprueba: string [] = [];
  NomUsu: string;
  puntosruta: number;
  listanum: number[]=[1];
  listarecomendaciones: string[]=[];
  listapreguntas: string[]=[];
  titulo:string;
  duracion: number;
  descripcion:string;
  ruta:string;
  recomendacion:string;
  idpublicacion: number;
  encontrado: boolean = false;

  publicacion= {Titulo: this.titulo, Descripcion: this.descripcion, Duracion:this.duracion, Ruta:this.ruta, Recomendacion:this.recomendacion, Idpublicacion: this.idpublicacion}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
    public UrlProvider: UrlProvider) {
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

  PonRecomendacion(){
    this.listanum.push(1);
    console.log(this.listanum);
    console.log(this.listapreguntas);
    console.log(this.listarecomendaciones);
  }

  Continuar(){
  // INTRODUCIR RECOMENDACION EN LA PUBLICACION
    this.publicacion.Recomendacion="";

    for (var i=0; i < this.listanum.length; i++){
      this.publicacion.Recomendacion= this.publicacion.Recomendacion.concat(this.listapreguntas[i]+ "\\\\" + this.listarecomendaciones[i] + ";;");
      console.log(this.publicacion.Recomendacion);
    }
/*
     //ENCONTRAR IDPUBLICACION
      this.UrlProvider.getNumPubli().subscribe( 
        respuesta=>{
          console.log ( respuesta);
          this.prueba= respuesta.valueOf();
      //    this.prueba= this.prueba.concat(" ");
          console.log("prueba:")
        //  console.log(this.listaprueba);
         // this.prueba = this.listaprueba[0];
           console.log(this.prueba);

        //  this.idpublicacion= respuesta;
        //  console.log(this.idpublicacion);
        //  this.idpublicacion= respuesta;
       //   console.log("numero publis" + this.idpublicacion);
       //   while(this.encontrado!= true){
       //     console.log("hemos entrado en el bucle");
       /*     this.UrlProvider.existeIdPubli(this.idpublicacion).subscribe(
              res=>{ 
                console.log("hemos hecho llamada");
                  console.log(res);
                  if (res == "true"){
                    console.log("ya existe");
                    //encontrar otro id
                    this.idpublicacion++;
                    
  
                  }else {
                    console.log("no existe");
                    this.encontrado=true;
                    
                    //subir la publi
                  }
              }
            );
       //   }
         console.log("hemos salido del while");
        }

      );*/



    // LLAMAR A LA PAG FOTOSVIAJE
   let Nombreusuario = { Nom:this.NomUsu };
    let publicaciones={Publi:this.publicacion};
    let numruta= {Puntos:this.puntosruta}
    // Abre la pagina perfil y le pasa el parametro NomUsu
    this.navCtrl.push(FotosviajePage, {Nom: Nombreusuario.Nom, Publi: publicaciones.Publi, Puntos: numruta.Puntos });
  
  }
 
}
