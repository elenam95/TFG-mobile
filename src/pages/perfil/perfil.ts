import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SubircontenidoPage} from '../subircontenido/subircontenido';
import {ConfiguracionPage} from '../configuracion/configuracion';
import {CrearmiviajePage} from '../crearmiviaje/crearmiviaje';
import {PublicacionPage} from '../publicacion/publicacion';
import {HttpClient} from '@angular/common/http';
import { ConfiguracionPageModule } from '../configuracion/configuracion.module';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http';
import { UrlProvider } from '../../providers/url/url';




/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
 
  
  listapubli: any []; //lista de publicaciones 
  listafotos: any []= []; //lista de fotografias
  lista: any []= new Array(); //=[] VACIO
  listaportadas: any []=[];
  res: Response;
  


  idpubli: number;
  file: File;
  imagenusu: string;
  imgprueba:string;
  NomUsu: string;
  nombre: string;
  pass:string;
  mail:string;;
  rol:string;
  fotousu:string;
  perfil:boolean;
  a:number;
  encontrado: boolean;
  imgportada:string []=[];
  usuario = { NomUsu:this.NomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu, Perfil: this.perfil};
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient,
                              private http2:Http, public UrlProvider: UrlProvider ) {
    // recoge los datos de la pagina anterior
    this.NomUsu= navParams.get('Nom');
    console.log(this.NomUsu);
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad PerfilPage');

    //descargar publicaciones  de la base de datos
         console.log('descargando publicaciones');
         this.UrlProvider.getPublicacionesUsu(this.NomUsu).subscribe(
          
           listapublicaciones => {  
                  
                  this.listapubli = listapublicaciones; //descargo publicaciones en la listapubli
                  console.log(this.listapubli);
                  this.Descargarfotos(); 
           }


         );
     // Descargar fotos del usuario
     this.Descargardatos();

  }
  Descargardatos(){
    //Descargar datos del usuario 
    console.log('descargando datos y foto usuario');
    this.UrlProvider.getUsuario(this.NomUsu).subscribe(
      usu =>{
              this.usuario = usu;
              console.log(this.usuario);

              //Descargamos la foto del usuario
              this.http2.get('http://localhost:3000/api/imagenes/fotosusuarios/download/'+this.usuario.Fotousu, {responseType: ResponseContentType.Blob} ).subscribe( 
                response => 
                           this.Cargarfotousu(response));
                
      });

    
  }
  
 Cargarfotousu(response: Response){

  const blob = new Blob([response.blob()], {type: 'image/jpg'});
  //Colocamos la imagen que esta en blob en la carpeta img correspondiente
  const reader= new FileReader();
  reader.addEventListener('load', ()=>{
    
    // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
    this.imagenusu = reader.result.toString();
  },false);

   // Aqui es donde ordeno que se lea la imagen y se prepare la URL
   if (blob) {
    reader.readAsDataURL(blob);
}

 }




  Descargarfotos(){
    // Función para decargar fotos de las publicaciones 
    console.log('descargando datos de las fotos de publicaciones');
    console.log(this.listapubli.length);
    for (var i=0; i < this.listapubli.length; i++ ){
      console.log(i);
     this.lista[i] = this.listapubli[i].Idpublicacion;
    }

    console.log("this.lista");
    console.log(this.lista);
    let cont =0;
   for(var j=0; j < this.listapubli.length; j++){
      this.UrlProvider.getFotospubli(this.lista[j]).subscribe(
        (listafotografias) =>{
                                cont++;
                                this.listafotos.push(listafotografias);
                                if(cont ===this.listapubli.length){

                                      this.Encontrarportada();
                                }
          
       }

      );

   }
   console.log(this.listafotos);
  

  }
  
 
 Encontrarportada(){
   // Funcion que recorre todas las publicaciones y guarda las fotos de portada de las publicaciones en listaportadas
   this.encontrado=false;
   let cont=0;
   var j=0;
   var x=0;
   console.log("this.listafotos");
   console.log(this.listafotos);
    // bucle que recorra todas las publicaciones 
    while(j<this.listafotos.length){
      console.log('j');
      console.log(j);
      // bucle que busque la foto de portada de cada publicacion 
      while((x<this.listafotos[j].length)&&(!this.encontrado)){
        console.log('x');
        console.log(x);
        if(this.listafotos[j][x].Portada==true){
          console.log('encontrada');
          this.listaportadas[j]= this.listafotos[j][x];
          cont++;
          
          this.encontrado=true;

        }
        else{
          console.log('No es foto de portada');
        }
        x++;
      }

      j++;
      if(cont ===this.listafotos.length){
        this.Descargarportadas();
      }
      x=0;
      this.encontrado= false;
    }
    console.log(this.listaportadas);
    console.log(this.listaportadas[0].Foto);
 }

 Descargarportadas(){ //Modificar!
   //Descargarmos las fotos de portada 
    console.log("funcion descargarportadas " + this.listaportadas[0].Foto);
    for (var i=0; i<this.listaportadas.length; i++){
      console.log("queremos ver");
        console.log(this.listaportadas[i].Idpublicacion);
         this.http2.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/'+this.listaportadas[i].Foto, {responseType: ResponseContentType.Blob} ).
        subscribe( response => {

                                //  this.listaresponse.push(response);
                                this.Cargarfotoportada(response)});
   }

  
 
 }

 Cargarfotoportada(response: Response){


  const blob = new Blob([response.blob()], {type: 'image/jpg'});
  //Colocamos la imagen que esta en blob en la carpeta img correspondiente
  const reader= new FileReader();
  reader.addEventListener('load', ()=>{
    // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
    this.imgportada.push(reader.result.toString());
   // console.log ('YYYY ' + this.imgportada);
  },false);

   // Aqui es donde ordeno que se lea la imagen y se prepare la URL
   if (blob) {
    reader.readAsDataURL(blob);
}


 }



  Subirfoto(){
    let Nombreusuario ={
      Nom:this.NomUsu
    }
    this.navCtrl.push(CrearmiviajePage, {Nom: Nombreusuario.Nom});
  }

  

  Configuracion(){
    console.log(this.lista);
    let Nombreusuario ={
      Nom:this.NomUsu
    }
    // Abre la pagina perfil y le pasa el parametro NomUsu

    this.navCtrl.push(ConfiguracionPage, {Nom: Nombreusuario.Nom});
  }

  MostrarPubli(i: number){
    console.log("es un boton" );
    console.log(i);
    this.idpubli= this.listaportadas[i].Idpublicacion;
    console.log(this.idpubli);
    let Idpublicacion = { Idpubli: this.idpubli}
    let Nombreusuario ={Nom:this.NomUsu}
  
    this.navCtrl.push( PublicacionPage , {Idpubli: Idpublicacion.Idpubli, Nom:Nombreusuario.Nom});
  }

}
