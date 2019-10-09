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

  
  listapubli: any [];
  listafotos: any [];
  idpubli: number;
  file: File;
  imagenusu: string;
  NomUsu: string;
  nombre: string;
  pass:string;
  mail:string;;
  rol:string;
  fotousu:string;
  usuario = { NomUsu:this.NomUsu, Nombre: this.nombre, Mail:this.mail, Rol:this.rol, Pass: this.pass, Fotousu: this.fotousu};
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient,private http2:Http ) {
    // recoge los datos de la pagina anterior
    this.NomUsu= navParams.get('Nom');
    console.log(this.NomUsu);
  }

  ionViewDidLoad() { // función que se realiza al cargarse la página
    console.log('ionViewDidLoad PerfilPage');
    //descargar publicaciones y fotografias  de la base de datos
    this.http.get<any>(this.APIUrl +'/'+ this.NomUsu + '/publicaciones' ).subscribe( listapublicaciones => { 
                                                                                            this.listapubli = listapublicaciones; //descargo publicaciones en la listapubli
                                                                                            console.log('publicaciones:' + this.listapubli.length);
                                                                                           //Creamos un for para sacar el id de las publicaciones del usuario y a partir de este obtener las fotos 
                                                                                           for(let i = 0; this.listapubli.length < 1; i++){
                                                                                            this.idpubli = this.listapubli[i] .Idpublicacion;
                                                                                            console.log('contador' + i);
                                                            
                                                                                            console.log('id publi:'  +this.idpubli);
                                                                                             // descargar fotografias de la base de datos 
   
                                                                                            this.http.get<any>(this.APIUrlfotos +'/'+ this.idpubli+ '/publi-fotos' ).subscribe( listafotografias => { 
                                                                                              this.listafotos = listafotografias;
                                                                                              console.log(this.listafotos);

                                                                                      
                                                                                      });


    }
  });
  this.Descargardatos(); 


   
  
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

 

  Subirfoto(){
    console.log("HOla");
    this.navCtrl.push(SubircontenidoPage);
  }

  

  Configuracion(){
    let Nombreusuario ={
      Nom:this.NomUsu
    }
    // Abre la pagina perfil y le pasa el parametro NomUsu

    this.navCtrl.push(ConfiguracionPage, {Nom: Nombreusuario.Nom});
  }

}
