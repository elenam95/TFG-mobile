import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../app/Usuario';
import { Observable } from 'rxjs/Observable';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http'
import { Fotografia } from '../../app/Fotografia';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UrlProvider {
  URLusuarios: string;
  Urlpublicaciones : string;
  Urlfotografias: string;
  UrlContenedorPublis: string;
  UrlContenedorUsu: string;

  constructor(public http: HttpClient,  private http2:Http) {
    console.log('Hello UrlProvider Provider');
    this.URLusuarios= 'http://localhost:3000/api/usuarios/';
    this.Urlpublicaciones= 'http://localhost:3000/api/publicacions/';
    this.Urlfotografias= 'http://localhost:3000/api/fotografias/';
    this.UrlContenedorPublis ='http://localhost:3000/api/imagenes/fotospublicaciones/';
    this.UrlContenedorUsu='http://localhost:3000/api/imagenes/fotosusuarios/';
  }

  //URLs USUARIO

  public getUsuario(NomUsu: string): Observable<Usuario> {
    return this.http.get<Usuario>( this.URLusuarios + NomUsu);
  }

  public getMail(mail: string){
    return this.http.get(this.URLusuarios +'findOne?filter={"where":{"Mail":"' +mail +'"}} ');
  }

  public SubirUsu(usuario: any){
    return this.http.post<any>(this.URLusuarios, usuario);
  }

  public ModificarUsu ( usuario: any){
    return this.http.patch<any>(this.URLusuarios, usuario);
  }

  public ExisteUsuario(NomUsu: string): Observable<any>{
    return this.http.get(this.URLusuarios + NomUsu + "/exists");
  }
  
  public EliminarUsuario(NomUsu: string){
    return this.http.delete(this.URLusuarios+ NomUsu);

  }

  //URLs PUBLICACIONES 

  public getPublicaciones ():Observable<any>{
    //Descarga todas las publicaciones
    return  this.http.get<Usuario>( this.Urlpublicaciones);
  }
  

  public getPublicacion (idpubli: string): Observable<any>{
    //Descarga los datos de una publicacion mediante su id
    return  this.http.get<Usuario>( this.Urlpublicaciones + idpubli);
  }
  

  public getPublicacionesUsu(nombre: string): Observable<any> {
    //descarga todas las publicaciones de un usuario
    return this.http.get<Usuario>( this.URLusuarios + nombre + '/publicaciones');
  }

  public getNumPubli (): Observable<any>{
    return this.http.get(this.Urlpublicaciones + "/count");
  }

  public existeIdPubli(id: number): Observable<any>{
    return this.http.get(this.Urlpublicaciones + id + "/exists");
  }

  public subirPublicacion (publi: any){
    return this.http.post<any>(this.Urlpublicaciones, publi).subscribe(() => console.log('publicacion subida'));
  }


  //URLs FOTOGRAFIAS

  public getAllFotos(): Observable<any> {
    // Me devuelve todas las fotografias 
    return this.http.get<any>( this.Urlfotografias);

  }

  public getFotospubli(id : string): Observable<any> {
    // Me devuelve todas las fotografias de una publicación
    return this.http.get<Usuario>( this.Urlpublicaciones + id + '/publi-fotos');

  }

  public SubirFoto(foto: Fotografia){
    console.log(foto);

    return this.http.post<any>(this.Urlfotografias, foto ).subscribe(() => console.log('foto subida'));
  }





  //URLs  CONTENEDOR IMAGEN 
  public getDescargarFotoUsu(Fotousu: string): Observable<any>{
    return this.http2.get(this.UrlContenedorUsu +'download/'+ Fotousu, {responseType: ResponseContentType.Blob});
  }
  public getDescargarFotoPubli(Foto: string): Observable<any>{
    return this.http2.get(this.UrlContenedorPublis + 'download/'+ Foto, {responseType: ResponseContentType.Blob});
  }

  public subirImgPubli(name: string, file:File){
    // Subir foto al contenedor de imagenes 
      const formData: FormData = new FormData(); //utilizamos objeto de la clase formData
      formData.append(file.name, file); //le pasamos nombre fichero y el propio fichero
    // este objeto será lo que enviamos posteriormente al post del contenedor de imagenes
    //enviamos la foto a nuestro contenedor fotospublicaciones
      this.http.post(this.UrlContenedorPublis + 'upload', formData).subscribe(() => console.log('subida a contenedor'));

    
  }

  public SubirImgUsu(name: string, file:File){
    // Subir foto usuario al contenedor de imagenes 
      const formData: FormData = new FormData(); 
      formData.append(file.name, file); 
      return this.http.post(this.UrlContenedorUsu + 'upload', formData);

  }

  public EliminarImgUsu (nombre: string){
    return this.http.delete(this.UrlContenedorUsu + "files/" + nombre);

  }

  


  
  

  


}
