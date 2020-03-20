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


  

  listaorden: string[]=[];
  listafotosordenada: any[]=[];
  listarecomendacion: string[]=[];
  encontrado: boolean= false;

 


  constructor(public http: HttpClient,  public UrlProvider: UrlProvider) {
    console.log('Hello PublicacionProvider Provider');
  }


   
public OrdenarFotos(listafotos: any[], listarutas: string[] ){
  //Inicializamos
  this.listaorden=['Portada'];
  this.listafotosordenada=[]; 
  this.encontrado=false;

  var x=0;
  listarutas.length = listarutas.length-1;
  console.log(listarutas)
// Encontramos foto portada
  while (!this.encontrado){
    console.log(listafotos[x].Portada)
    if(listafotos[x].Portada == true){
      this.listafotosordenada.push(listafotos[x]);
      console.log("portada encontrada");
      console.log(this.listafotosordenada)
      this.encontrado=true;
    }else{
      x++;
      console.log(x);
    }
    
  }
 
//Ordenamos las fotos 
  for (var j=0; j < listarutas.length; j++){
    for (var i=0; i < listafotos.length; i++){
        if(listafotos[i].puntoruta == listarutas[j]){
            this.listaorden.push(listarutas[j]);
            this.listafotosordenada.push(listafotos[i]);
        }
    }

  }
  console.log("FUncion ordenarfotos")
  console.log(this.listafotosordenada);
 // console.log("rutas organizadas")
  console.log(this.listaorden);
  return this.listafotosordenada;
  }

  public OrdenarPuntosRuta(){
      //Añadimos recomendación
      this.listaorden[this.listaorden.length]= "Recomendaciones";
      return this.listaorden;
  }

  public OrdenarRecomendacion(recomendacion: string){
    this.listarecomendacion=[];
    this.listarecomendacion = recomendacion.split(";;");
    this.listarecomendacion.length= this.listarecomendacion.length-1;
    return this.listarecomendacion;
  }


}
