import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FotosviajePage} from '../fotosviaje/fotosviaje';
import { UrlProvider } from '../../providers/url/url';
import {HttpClient} from '@angular/common/http';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
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
  listanum: number[]=[1];
  listarecomendaciones: string[]=[];
  listapreguntas: string[]=[];
  titulo:string;
  duracion: number;
  descripcion:string;
  ruta:string;
  recomendacion:string;
  idpublicacion: number;
  //encontrado: boolean = false;
  listaId: any []=[];
 
  

  publicacion= {Titulo: this.titulo, Descripcion: this.descripcion, Duracion:this.duracion, Ruta:this.ruta, Recomendacion:this.recomendacion, Idpublicacion: this.idpublicacion, IdNomUsu: this.NomUsu}

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
    public UrlProvider: UrlProvider) {
    // recoge los datos de la pagina anterior
    console.log("nueva pag");
    this.NomUsu= navParams.get('Nom');
    this.publicacion= navParams.get('Publi');
    console.log(this.NomUsu);
    console.log(this.publicacion);

    

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
      this.publicacion.Recomendacion= this.publicacion.Recomendacion.concat( this.listarecomendaciones[i] + ";;");
      console.log(this.publicacion.Recomendacion);
    }

  //ENCONTRAR IDPUBLICACION
  this.UrlProvider.getPublicaciones().subscribe(
    res=>{  // idpublicacion tenemos el id de la ultima publicacion
            this.idpublicacion= res[res.length-1].Idpublicacion;
            console.log(this.idpublicacion)

            //Subir la publicacion
            this.publicacion.Idpublicacion= this.idpublicacion+1;
            console.log(this.publicacion);
            this.UrlProvider.subirPublicacion(this.publicacion);
      

             // LLAMAR A LA PAG FOTOSVIAJE
   let Nombreusuario = { Nom:this.NomUsu };
   let publicaciones={Publi:this.publicacion};
   let rutas= {Rutas: this.publicacion.Ruta}
   let Idpubli= {Idpubli: this.publicacion.Idpublicacion}
   // Abre la pagina perfil y le pasa el parametro NomUsu
   this.navCtrl.push(FotosviajePage, {Nom: Nombreusuario.Nom, Publi: publicaciones.Publi, Rutas:rutas.Rutas, Idpubli:Idpubli.Idpubli });
 

    }
  );





/*
     //ENCONTRAR IDPUBLICACION
    this.UrlProvider.getNumPubli().subscribe(  
      respuesta=>{  this.idpublicacion= respuesta.count;
                     console.log(this.idpublicacion);

                    
                     while(!this.encontrado){
                       //Comprobamos no exista este idpublicacion
                       console.log("hemos entrado");
                     this.UrlProvider.existeIdPubli(this.idpublicacion).subscribe(
                      res=>{   console.log(res);
                            if(res.exists == true){
                               console.log("ya existe");
                               this.idpublicacion++;
                               console.log(this.idpublicacion);
                             }else{
                               console.log("no existe");
                               this.encontrado=true;
                             }
                      });
            }
   });*/






   
  }
 
}
