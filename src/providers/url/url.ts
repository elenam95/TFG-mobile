import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UrlProvider Provider');
  }

  //URLs USUARIO

  getUsuarios() {
    return this.http.get('http://localhost:3000/api/usuarios/');
  }

  getMail(){
    return this.http.get('http://localhost:3000/api/usuarios/findOne?filter=%7B%22where%22%3A%7B%22Mail%22%3A%22');
  }

  //URLs IMAGEN 

  getFotoUsu(){
    return this.http.get('http://localhost:3000/api/imagenes/fotosusuarios/download/');
  }
  getDescargarFotoPubli(){
    return this.http.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/');
  }

  //URLs PUBLICACION 

  getPublicaciones(){
    return this.http.get('http://localhost:3000/api/publicacions');
  }

  

  


}
