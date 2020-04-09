import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PublicacionProvider} from '../../providers/publicacion/publicacion';
import { UrlProvider } from '../../providers/url/url';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Location } from '@angular/common';
import {ConfiguracionPage} from '../configuracion/configuracion';
import {CrearmiviajePage} from '../crearmiviaje/crearmiviaje';
import {PerfilPage} from '../perfil/perfil';


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
 // img: string;
 // Titulo: string;

 // separador: string = ";;";

  listarutas: string[]=["Portada"];
  listafotos: any[]=[];
  listaorden: string[]=[];
  listaOrdenadaFotos: any[]=[];
  listaNomFoto: string[]=[];
 // listaOrdenadaImg: any[]=[];

 // listapaso: any[]=[];
  listarecomendaciones:any[]=[];

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, 
                      public PublicacionProvider: PublicacionProvider, public UrlProvider: UrlProvider,
                      private http2:Http, private location: Location) {

    // recoge los datos de la pagina anterior
    this.NomUsu= navParams.get('Nom');
    this.Idpubli = navParams.get('Idpubli');
    console.log(this.NomUsu + this.Idpubli);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicacionPage');
  //Inicializamos
    this.listaorden=[];
    this.listaOrdenadaFotos=[];
    this.imgcontenedor= [];
    console.log(this.Idpubli);
    
   //Descarga datos usuario de la publicacion
      this.UrlProvider.getUsuario(this.NomUsu).subscribe(
        usu=>{ 
                 //Descargamos la foto del usuario
                 this.UrlProvider.getImgUsu(usu.Fotousu).subscribe(
                  response => { 
                    
                    this.Cargarfotousu(response); });
              });

  //Descargar info publicacion
  this.http.get<any>('http://localhost:3000/api/publicacions/' + this.Idpubli).subscribe(
    publi => { this.publicacion= publi;
              console.log(publi)
               this.listarutas = publi.Ruta.split(";;");
               this.listarecomendaciones= this.PublicacionProvider.OrdenarRecomendacion(publi.Recomendacion);

                //Descargar fotos publicacion
       this.http.get<any>( 'http://localhost:3000/api/publicacions/' + this.Idpubli+ '/publi-fotos ').subscribe(
        res =>{ console.log(res)
              this.listafotos= res;
              this.listaOrdenadaFotos = this.PublicacionProvider.OrdenarFotos(this.listafotos, this.listarutas);
              this.listaorden= this.PublicacionProvider.OrdenarPuntosRuta();
              console.log("DESPUES PROVIDER")
              console.log(this.listaOrdenadaFotos)
              console.log(this.listaorden)


              //Añadimos recomendacion
                this.http.get<any>('http://localhost:3000/api/fotografias/5').subscribe(
                    res => {
                              this.listaOrdenadaFotos[this.listaOrdenadaFotos.length]= res;
  
                                //Descargar img del contenedor 
                              for (var i=0; i<this.listaOrdenadaFotos.length; i++){
                                   this.http2.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/'+ this.listaOrdenadaFotos[i].Foto, {responseType: ResponseContentType.Blob}).subscribe(
                                      resp => { //console.log(resp.url)
                                                 this.listaNomFoto = resp.url.split("download/");
                                                // console.log(this.listaNomFoto)
  
                                                 for(var j=0; j<this.listaOrdenadaFotos.length; j++){
                                                 // console.log(j)
                                                 // console.log(this.listaOrdenadaFotos[j].Foto + " " + this.listaNomFoto[1])
                                                  if(this.listaOrdenadaFotos[j].Foto == this.listaNomFoto[1]){
                                                  //  console.log("coinciden");
                                                    this.Cargarfotospublicaciones(resp, j);
                                                  }
                                                 
                                                 }
                                                
   
                                       });
                                }
                      }
                ); 
         
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

  public Cargarfotospublicaciones(response: Response,  posicion: number){
   
        //Cargar foto publicaciones
        const blob = new Blob([response.blob()], {type: 'image/jpg'});
        //Colocamos la imagen que esta en blob en la carpeta img correspondiente
        const reader= new FileReader();
        reader.addEventListener('load', ()=>{
   
         // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
        // this.imgcontenedor.push(reader.result.toString());
       //  console.log(posicion)
       // console.log(response.url)
         this.imgcontenedor[posicion] = reader.result.toString();
         
          },false);

        // Aqui es donde ordeno que se lea la imagen y se prepare la URL
         if (blob) {
         reader.readAsDataURL(blob);
   
          }

  }

  public Configuracion(){
    let Nombreusuario ={
      Nom:this.NomUsu
    }
    // Abre la pagina perfil y le pasa el parametro NomUsu

    this.navCtrl.push(ConfiguracionPage, {Nom: Nombreusuario.Nom});
  }
  public Subirfoto(){
    let Nombreusuario ={
      Nom:this.NomUsu
    }
    this.navCtrl.push(CrearmiviajePage, {Nom: Nombreusuario.Nom});
  }

  public MiPerfil(){
    let Nombreusuario = { Nom:this.NomUsu };
   
    this.navCtrl.push(PerfilPage, {Nom: Nombreusuario.Nom} );
  }
 



}
