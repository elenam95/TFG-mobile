import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {UrlProvider} from '../url/url';
import { p, l } from '@angular/core/src/render3';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http';

/*
  Generated class for the PublicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicacionProvider {

  imagenusu: string;
  encontrado: boolean= false;
  listarecomendaciones: any[];
  separador: string = ";;";

  constructor(public http: HttpClient,  public UrlProvider: UrlProvider) {
    console.log('Hello PublicacionProvider Provider');
  }


  public OrganizarRutas(listarutas: any[], listapaso: any[]){

    for  (var j=0; j < listapaso.length; j++){
       listarutas[j+1]= listapaso[j];
    }

    listarutas.push("Recomendaciones");
    return listarutas;
  }

  public OrganizarPublis(listafotos: any[], puntoruta: string){
    let listapublis: any[]=[];
    
    if (puntoruta === "Portada"){
      for (var i=0; i < listafotos.length; i++){
        if(listafotos[i].Portada==true){
           listapublis.push(listafotos[i]);
          }
      }
    } else {
      for (var j=0; j < listafotos.length; j++){
        if(listafotos[j].puntoruta === puntoruta){
              listapublis.push(listafotos[j]);
          }
      }

    }

     
    return listapublis;
  }

  
  
  


 
 
   
  
     

}
