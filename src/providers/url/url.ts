import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../app/Usuario';
import { Observable } from 'rxjs/Observable';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http'

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {
  URLusuarios: string;
  Urlpublicaciones : string;

  constructor(public http: HttpClient,  private http2:Http) {
    console.log('Hello UrlProvider Provider');
    this.URLusuarios= 'http://localhost:3000/api/usuarios/';
    this.Urlpublicaciones= 'http://localhost:3000/api/publicacions/';

  }

  //URLs USUARIO

  public getUsuario(nombre: string): Observable<Usuario> {
    return this.http.get<Usuario>( this.URLusuarios + nombre);
  }

  public getMail(mail: string){
    return this.http.get('http://localhost:3000/api/usuarios/findOne?filter={"where":{"Mail":"' +mail +'"}} ');
  }

  //URLs PUBLICACIONES 
  

  public getPublicacion(nombre: string): Observable<any> {
    return this.http.get<Usuario>( this.URLusuarios + nombre + '/publicaciones');
  }

  public getFotopubli(id : number): Observable<any> {
    return this.http.get<Usuario>( this.Urlpublicaciones + id + '/publi-fotos');

  }

  public getNumPubli (): Observable<any>{
    return this.http.get(this.Urlpublicaciones + "/count");
  }

  public existeIdPubli(id: number): Observable<any>{
    return this.http.get(this.Urlpublicaciones + id + "/exists");
  }

  

  //URLs IMAGEN 
  //(no se bien como hacerlo aun)
  public getDescargarFotoUsu(Fotousu: string): Observable<any>{
    return this.http2.get('http://localhost:3000/api/imagenes/fotosusuarios/download/'+ Fotousu);
  }
  public getDescargarFotoPubli(){
    return this.http.get('http://localhost:3000/api/imagenes/fotospublicaciones/download/');
  }

  public subirImgPubli(name: string, file:File){
    // Subir foto al contenedor de imagenes 
 const formData: FormData = new FormData(); //utilizamos objeto de la clase formData
 formData.append(file.name, file); //le pasamos nombre fichero y el propio fichero
 // este objeto será lo que enviamos posteriormente al post del contenedor de imagenes
 //enviamos la foto a nuestro contenedor fotospublicaciones
 this.http.post('http://localhost:3000/api/imagenes/fotospublicaciones/upload', formData).subscribe(() => console.log('subida a contenedor'));

    
  }



  
  

  


}
