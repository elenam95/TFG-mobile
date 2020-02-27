import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlProvider } from '../../providers/url/url';
import { Usuario } from '../../app/Usuario';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  usu: Usuario;
  res: string;

  constructor(public http: HttpClient, public UrlProvider: UrlProvider) {
    console.log('Hello LoginProvider Provider');
  }

}
