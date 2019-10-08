import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SubircontenidoPage} from '../subircontenido/subircontenido';
import {HttpClient} from '@angular/common/http';


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

  Subirfoto(){
    console.log("HOla");
    this.navCtrl.push(SubircontenidoPage);
  }

}
