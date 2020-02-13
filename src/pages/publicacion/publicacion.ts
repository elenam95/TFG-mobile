import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PublicacionProvider} from '../../providers/publicacion/publicacion';
import { UrlProvider } from '../../providers/url/url';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http';

/**
 * Generated class for the PublicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicacion',
  templateUrl: 'publicacion.html',
})
export class PublicacionPage {

  NomUsu:string;
  Idpubli: string;
  publicacion: any;
  imagenusu:string;
  idusuario: string;
  Titulo: string;
  separador: string = ";";
  listarutas: string[]=[];
  listafotos: any[]=[];


  londres:string ="londres";
  paris:string="paris";
  prueba1:string = "por defecto";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
                      public PublicacionProvider: PublicacionProvider, public UrlProvider: UrlProvider,
                      private http2:Http) {

    // recoge los datos de la pagina anterior
    this.NomUsu= navParams.get('Nom');
    this.Idpubli = navParams.get('Idpubli');
    console.log(this.NomUsu + this.Idpubli);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicacionPage');

    //Descargar datos de la publicacion
    this.UrlProvider.getPublicacion(this.Idpubli).subscribe(
            publi=>{ this.publicacion=publi;
                      this.Titulo= publi.Titulo;
                     this.listarutas= publi.Ruta.split(this.separador);
                     console.log(this.listarutas);

                     //Descarga datos usuario de la publicacion
                      this.UrlProvider.getUsuario(this.publicacion.IdNomUsu).subscribe(
                          usu=>{  this.idusuario= usu.NomUsu;
                                 console.log(this.idusuario);
                                
                                   //Descargamos la foto del usuario
                                   this.http2.get('http://localhost:3000/api/imagenes/fotosusuarios/download/'+usu.Fotousu, {responseType: ResponseContentType.Blob} ).subscribe( 
                                    response => { this.Cargarfotousu(response); });
             
                                });
            });

    //Descargar fotografias de la publicación
    this.UrlProvider.getFotospubli(this.Idpubli).subscribe(
      fotos=>{ this.listafotos=fotos;
                console.log(this.listafotos);

                //Descargamos img del contenedor
                for(var j=0; j < this.listafotos.length; j++){
                  this.http2.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/' + this.listafotos[j].Foto, {responseType: ResponseContentType.Blob} ).subscribe(
                    response => { //this.Cargarfotopubli(response);
                    });
                }
              
              });

      
    
  }




  public Cargarfotousu(response: Response){
    //Cargar foto usuario

    const blob = new Blob([response.blob()], {type: 'image/jpg'});
    //Colocamos la imagen que esta en blob en la carpeta img correspondiente
    const reader= new FileReader();
    reader.addEventListener('load', ()=>{
      
      // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
      this.imagenusu = reader.result.toString();
      return this.imagenusu;
    },false);
  
     // Aqui es donde ordeno que se lea la imagen y se prepare la URL
     if (blob) {
      reader.readAsDataURL(blob);
      
  }
}




  Mostrarruta(name:string){
    console.log(name);
    this.prueba1 = name;
  }

}
