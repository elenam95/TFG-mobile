import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SubircontenidoPage} from '../subircontenido/subircontenido';
import {ConfiguracionPage} from '../configuracion/configuracion';
import {HttpClient} from '@angular/common/http';
import { ConfiguracionPageModule } from '../configuracion/configuracion.module';


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

  NomUsu: string;
  listapubli: any [];
  listafotos: any [];
  idpubli: number;
  file: File;
  foto:string;
  
  


  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient) {
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


   
  
  }

  Mostrar($event){  
    //Función que coge el fichero seleccionado y leerlo mediante FileReader para dejar su información en la variable foto, de donde posteriormente se alimentara la imagen 
   this.file = $event.target.files[0];
   console.log ('fichero' +this.file.name);
   const reader = new FileReader();
   reader.readAsDataURL(this.file);
   reader.onload =() => {
     console.log ('ya');
     this.foto =reader.result.toString();
   }

 }

  Subirfoto(){
    console.log("HOla");
    this.navCtrl.push(SubircontenidoPage);
  }

  Subirfotousu (){
     // Subir foto al contenedor de imagenes 
  const formData: FormData = new FormData(); //utilizamos objeto de la clase formData
  formData.append(this.file.name, this.file); //le pasamos nombre fichero y el propio fichero
  // este objeto será lo que enviamos posteriormente al post del contenedor de imagenes
  //enviamos la foto a nuestro contenedor fotospublicaciones
  this.http.post('http://localhost:3000/api/imagenes/fotosusuarios/upload', formData).subscribe(() => console.log('subida a contenedor'));
  }

  Configuracion(){
    let Nombreusuario ={
      Nom:this.NomUsu
    }
    // Abre la pagina perfil y le pasa el parametro NomUsu

    this.navCtrl.push(ConfiguracionPage, {Nom: Nombreusuario.Nom});
  }

}
