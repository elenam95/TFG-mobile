import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { stringify } from '@angular/compiler/src/util';
/*
  Generated class for the ComprobarInputsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComprobarInputsProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
    console.log('Hello ComprobarInputsProvider Provider');
  }

  public Login(NomUsu: string, pass: string){
      let respuesta;

      if(NomUsu == undefined || pass == undefined || NomUsu == "" || pass == "" ){

            console.log("ERROR")
            respuesta = "KO"
            const alert = this.alertCtrl.create({
               title: 'Error',
               subTitle: 'Los campos no pueden estar vacios',
              buttons: ['OK']
            });
            alert.present();

      } else {
            console.log("CORRECTO")
            respuesta= "OK"
      }

       return respuesta;

  }

  public CrearCuenta(mail:string, nombre:string, NomUsu: string, pass: string, rol:string, perfil: boolean){
    let respuesta;
    if (NomUsu == undefined || pass == undefined || NomUsu == "" || pass == "" || mail == undefined || mail == ""
        || nombre == undefined || nombre == "" || rol == undefined || rol == "" || perfil == undefined){

          console.log("ERROR")
          respuesta = "KO"
          const alert = this.alertCtrl.create({
             title: 'Error',
             subTitle: 'Los campos no pueden estar vacios',
            buttons: ['OK']
          });
          alert.present();

    }else{

          console.log("CORRECTO")
          respuesta= "OK"
    }
    return respuesta;

  }

  public Configuracion(NomUsu: string, Nombre: string){
    let respuesta;

      if(NomUsu == undefined || Nombre == undefined || NomUsu == "" || Nombre == "" ){

            console.log("ERROR")
            respuesta = "KO"
            const alert = this.alertCtrl.create({
               title: 'Error',
               subTitle: 'Los campos no pueden estar vacios',
              buttons: ['OK']
            });
            alert.present();

      } else {
            console.log("CORRECTO")
            respuesta= "OK"
      }

       return respuesta;
  }

  public CambiarContraseña(pass: string, nuevapass: string, nuevapass2: string){
    let respuesta;

    if(pass == undefined || nuevapass == undefined || pass == "" || nuevapass == ""
         || nuevapass2 == undefined || nuevapass2 == ""){

          console.log("ERROR")
          respuesta = "KO"
          const alert = this.alertCtrl.create({
             title: 'Error',
             subTitle: 'Los campos no pueden estar vacios',
            buttons: ['OK']
          });
          alert.present();

    } else {
          console.log("CORRECTO")
          respuesta= "OK"
    }

     return respuesta;
  }

  public Crearmiviaje(titulo: string, dias: number, puntosrutas : string){
    let respuesta;

    if(titulo == undefined || puntosrutas == undefined || titulo == "" || puntosrutas == ""
         || dias == undefined ){

          console.log("ERROR")
          respuesta = "KO"
          const alert = this.alertCtrl.create({
             title: 'Error',
             subTitle: 'Los campos no pueden estar vacios',
            buttons: ['OK']
          });
          alert.present();

    } else {
          console.log("CORRECTO")
          respuesta= "OK"
    }

     return respuesta;
  }

  public FotosViaje(numfotos: number ,rol: string[], nota: number[], ruta: string[]){
    let respuesta;
    var contador=0;
    for (var i=0; i<numfotos; i++){
      if(rol[i] == undefined || nota[i] == undefined || ruta[i] == undefined){
        console.log("ERROR")
        respuesta = "KO";
        contador++;

      }else {
        console.log("CORRECTO")
        respuesta= "OK"
      }
    }
    if (contador >=1){
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Los campos no pueden estar vacios',
       buttons: ['OK']
     });
     alert.present();
    }
    return respuesta;
  }


}
