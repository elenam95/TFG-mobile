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
  

  constructor(public http: HttpClient,  public UrlProvider: UrlProvider) {
    console.log('Hello PublicacionProvider Provider');
  }

  


 
 
   
  
     

}
