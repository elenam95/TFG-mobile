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
  imgcontenedor:string []=[];
  img: string;
  idusuario: string;
  Titulo: string;

  separador: string = ";";
  separador2: string= ";;";
  listarutas: string[]=["Portada"];
  listafotos: any[]=[];
  listafotos_ruta: any []=[];
  listapaso: any[];
  listarecomendaciones:any[];
  portada: boolean=true;
  recomendacion: boolean= false;
  fotos: boolean= false;
  listaNumFotos: any[]=[];

  
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
              console.log(this.publicacion);
                      this.Titulo= publi.Titulo;
                      this.listapaso = publi.Ruta.split(this.separador);
                      this.listarutas=this.PublicacionProvider.OrganizarRutas(this.listarutas, this.listapaso);
                      console.log(this.listarutas);

                     //Descarga datos usuario de la publicacion
                      this.UrlProvider.getUsuario(this.publicacion.IdNomUsu).subscribe(
                          usu=>{  this.idusuario= usu.NomUsu;
                                 console.log(this.idusuario);
                                
                                   //Descargamos la foto del usuario
                                   this.http2.get('http://localhost:3000/api/imagenes/fotosusuarios/download/'+usu.Fotousu, {responseType: ResponseContentType.Blob} ).subscribe( 
                                    response => { 
                                      
                                      this.Cargarfotousu(response); });
             
                                });
            });

    //Descargar fotografias de la publicación
    this.UrlProvider.getFotospubli(this.Idpubli).subscribe(
      fotos=>{ this.listafotos=fotos;
              console.log(this.listafotos);
              this.listafotos_ruta= this.PublicacionProvider.OrganizarPublis(this.listafotos, "Portada");
            //  this.listaNumFotos= this.PublicacionProvider.Publicaciones(this.listafotos, "Portada");
                console.log(this.listafotos_ruta);
             //   console.log(this.listaNumFotos);

                //Descargamos img de las publicaciones
             /*   for (var i=0; i<this.listafotos.length; i++){
                  this.http2.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/' + this.listafotos[i].Foto, {responseType: ResponseContentType.Blob} ).subscribe(
                    response => { 
                                //  console.log(response);
                                  this.Cargarfotospublicaciones(response);
                    }); 
                }*/
            
               
                //Descargamos portada del contenedor 
                this.http2.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/' + this.listafotos_ruta[0].Foto, {responseType: ResponseContentType.Blob} ).subscribe(
                    response => { 
                                //  console.log(response);
                                  this.Cargarfotospublicaciones(response);
                    });
              
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
      //console.log(this.imagenusu);
      return this.imagenusu;
    },false);
  
     // Aqui es donde ordeno que se lea la imagen y se prepare la URL
     if (blob) {
      reader.readAsDataURL(blob);
      
  }

  }

  public Cargarfotospublicaciones(response: Response){
    this.imgcontenedor=[];
    //Cargar foto publicaciones
    const blob = new Blob([response.blob()], {type: 'image/jpg'});
    //Colocamos la imagen que esta en blob en la carpeta img correspondiente
    const reader= new FileReader();
    reader.addEventListener('load', ()=>{
      
      // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
      this.imgcontenedor.push(reader.result.toString());
      console.log(this.imgcontenedor);
      return this.imgcontenedor;
    },false);
  
     // Aqui es donde ordeno que se lea la imagen y se prepare la URL
     if (blob) {
      reader.readAsDataURL(blob);
      
  }
 

}

  Mostrarruta(name:string){
    console.log(name);

    if(name == "Portada"){
      this.portada = true;
      this.recomendacion= false;
      this.fotos= false;
    }else if (name == "Recomendaciones"){
      this.portada = false;
      this.recomendacion= true;
      this.fotos= false;
      this.listarecomendaciones= this.publicacion.Recomendacion.split(this.separador2);
      console.log(this.listarecomendaciones);
    } else {
      this.portada = false;
      this.recomendacion= false;
      this.fotos= true;
    }

    this.listafotos_ruta=[];
    console.log("this.listafotos_ruta");
    console.log(this.listafotos_ruta);
   this.listafotos_ruta= this.PublicacionProvider.OrganizarPublis(this.listafotos, name);
   console.log(this.listafotos_ruta);
  // console.log(this.recomendacion);

   //descargamos fotos contenedor 
   for (var i=0; i<this.listafotos_ruta.length; i++){
    this.http2.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/' + this.listafotos_ruta[i].Foto, {responseType: ResponseContentType.Blob} ).subscribe(
      response => { 
                    console.log(response);
                    this.Cargarfotospublicaciones(response);
                   
      });
   }
   
 
    
  }

}
