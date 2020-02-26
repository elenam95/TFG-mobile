import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response, ResponseContentType} from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

/*
  Generated class for the PerfilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfilProvider {

 
  listaportadas: any []=[];
  listaordenada: any []=[];
  listaNumPubli: number []=[];
  encontrado: boolean;
  enc: boolean;


  constructor(public http: HttpClient, public UrlProvider : UrlProvider  ) {
    console.log('Hello PerfilProvider Provider');
  }


public EncontrarPortada(listafotos: any[]){
 // Funcion que recorre todas las publicaciones y guarda las fotos de portada de las publicaciones en listaportadas
 this.encontrado=false;
 let cont=0;
 var j=0;
 var x=0;
 console.log("this.listafotos");
 console.log(listafotos);
  // bucle que recorra todas las publicaciones 
  while(j<listafotos.length){
    console.log('j');
    console.log(j);
    // bucle que busque la foto de portada de cada publicacion 
    while((x<listafotos[j].length)&&(!this.encontrado)){
      console.log('x');
      console.log(x);
      if(listafotos[j][x].Portada==true){
        console.log('encontrada');
        this.listaportadas[j]= listafotos[j][x];
        cont++;
        
        this.encontrado=true;

      }
      else{
        console.log('No es foto de portada');
      }
      x++;
    }

    j++;
    if(cont ===listafotos.length){

     return this.listaportadas;
    }
    x=0;
    this.encontrado= false;
  }
  console.log(this.listaportadas);
  console.log(this.listaportadas[0].Foto);


}

public OrdenarPortadas(lista: any[], listap: any[]){


  for (var j=1; j < lista.length+1; j++){
    for (var i=0; i < lista.length; i++){
         if (listap[i].Idpublicacion == lista[lista.length-j]){
             this.listaordenada.push(listap[i]);
         }
    }
  }
  console.log("lista ordenada");
  console.log(lista);
  console.log(listap);
  console.log(this.listaordenada);
  return this.listaordenada;

}



}
