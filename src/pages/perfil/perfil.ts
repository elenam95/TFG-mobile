import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SubircontenidoPage} from '../subircontenido/subircontenido';
import {ConfiguracionPage} from '../configuracion/configuracion';
import {HttpClient} from '@angular/common/http';
import { ConfiguracionPageModule } from '../configuracion/configuracion.module';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http';



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
  private APIUrl = 'http://localhost:3000/api/usuarios'  //base de la url 
  private APIUrlfotos = 'http://localhost:3000/api/publicacions' //url para descargar fotos 
  private APIUrlfotousu = 'http://localhost:3000/api/imagen/fotosusuarios/download' //url para descargar foto usuario

  
  listapubli: any []; //lista de publicaciones 
  listafotos: any []= []; //lista de fotografias
  lista: any []= new Array(); //=[] VACIO
  listaportadas: any []=[];
  listaprueba: any[]=[];
  res: Response;
  


  idpubli: number;
  file: File;
  imagenusu: string;
  NomUsu: string;
  nombre: string;
  pass:string;
  mail:string;;
  rol:string;
  fotousu:string;
  perfil:boolean;
  a:number;
  encontrado: boolean;
  imgportada:string;
  usuario = { NomUsu:this.NomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu, Perfil: this.perfil};
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient,private http2:Http ) {
    // recoge los datos de la pagina anterior
    this.NomUsu= navParams.get('Nom');
    console.log(this.NomUsu);
  }

  ionViewDidLoad() { // función que se realiza al cargarse la página
    console.log('ionViewDidLoad PerfilPage');
    //descargar publicaciones y fotografias  de la base de datos
    this.http.get<any>(this.APIUrl +'/'+ this.NomUsu + '/publicaciones' ).
        subscribe( listapublicaciones => { 
               this.listapubli = listapublicaciones; //descargo publicaciones en la listapubli
               console.log('publicaciones:' + this.listapubli.length);
               console.log(this.listapubli);
               this.Descargarfotos();     
      });
  // Descargar fotos del usuario
  this.Descargardatos();
  this.Descargarportadas();

  }


  Descargardatos(){
    //Descargamos nombre de la foto del usuario 
    /*let fotousu;  (NO ME FUNCIONA PORQ NO SE COMO CONVERTIR LA RESPUESTA EN UN STRING! SOLO DESCARGABA EL NOMBRE DE LA FOTO)
    this.http.get<any>(this.APIUrl +'/'+ this.NomUsu +'?filter=%7B%22fields%22%3A%7B%22Fotousu%22%3Atrue%7D%7D' ).
    subscribe (foto =>{
      fotousu = foto;
      console.log(fotousu);
    }); */

    //Descargar datos del usuario 
    this.http.get<any>(this.APIUrl + '/' + this.NomUsu).subscribe(usu =>{
      this.usuario = usu;
      console.log(this.usuario);
      //Descargamos la foto del usuario 
      this.http2.get('http://localhost:3000/api/imagenes/fotosusuarios/download/' +this.usuario.Fotousu, {responseType: ResponseContentType.Blob} ).subscribe( response => 
      this.Cargarfotousu(response));
    });
 
    
  }

  Descargarfotos(){
    // Función para decargar fotos de las publicaciones 
    console.log(this.listapubli.length);
    for (var i=0; i < this.listapubli.length; i++ ){
      console.log(i);
     this.lista[i] = this.listapubli[i].Idpublicacion;
   
    }
    console.log(this.lista);
   // this.prueba2();
   for(var j=0; j < this.listapubli.length; j++){
    this.http.get<any>('http://localhost:3000/api/publicacions'+'/'+this.lista[j]+'/'+'publi-fotos').subscribe(
      (listafotografias) =>{
        this.listafotos.push(listafotografias);
        
     }
    );
   }
   console.log(this.listafotos);

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

 Encontrarportada(){
   // Funcion que recorre todas las publicaciones y guarda las fotos de portada de las publicaciones en listaportadas
   this.encontrado=false;
   var j=0;
   var x=0;
   console.log(this.listafotos[1].length);
   console.log(this.listafotos[0].length);
   console.log(this.listafotos.length);
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
          this.encontrado=true;

        }
        else{
          console.log('No es foto de portada');
        }
        x++;
      }

      j++;
      x=0;
      this.encontrado= false;
    }
    console.log(this.listaportadas);
    console.log(this.listaportadas[0].Foto);
    this.Descargarportadas();
 }

 Descargarportadas(){
   //Descargarmos las fotos de portada 
    this.listaprueba[0]='tilandia2.jpg';
    this.listaprueba[1]='fotoespaña.jpg';

   for (var i=0; i<this.listaprueba.length; i++){
    this.http2.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/'+this.listaprueba[i], {responseType: ResponseContentType.Blob} ).
    subscribe( response => 
    this.Cargarfotoportada(response));
    
    console.log(this.listaprueba[i]);
   }

  
 
 }

 Cargarfotoportada(response: Response){

  const blob = new Blob([response.blob()], {type: 'image/jpg'});
  //Colocamos la imagen que esta en blob en la carpeta img correspondiente
  const reader= new FileReader();
  reader.addEventListener('load', ()=>{
    // Pongo a la espera al reader de manera que en cuanto acabe coloca la URL donde toca para que se vea la imagen
    this.imgportada = reader.result.toString();
  },false);

   // Aqui es donde ordeno que se lea la imagen y se prepare la URL
   if (blob) {
    reader.readAsDataURL(blob);
}


 }





 

  Subirfoto(){
    console.log("HOla");
    this.navCtrl.push(SubircontenidoPage);
  }

  

  Configuracion(){
    console.log(this.lista);
    let Nombreusuario ={
      Nom:this.NomUsu
    }
    // Abre la pagina perfil y le pasa el parametro NomUsu

    this.navCtrl.push(ConfiguracionPage, {Nom: Nombreusuario.Nom});
  }

}
