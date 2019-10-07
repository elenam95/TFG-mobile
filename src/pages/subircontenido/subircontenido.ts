import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { t } from '@angular/core/src/render3';
import {HttpClient} from '@angular/common/http';

/**
 * Generated class for the SubircontenidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subircontenido',
  templateUrl: 'subircontenido.html',
})
export class SubircontenidoPage {
  
  file: File;
  foto:string;
  descripcion:string;
  rol:string;
  web:string;
  nota:number;
  positivo:string;
  negativo:string;
  dia:number;
  Idfoto:number;
  idpublicacion:number;

  private APIUrl = 'http://localhost:3000/api/fotografias'  //base de la url 



  constructor(public navCtrl: NavController, public navParams: NavParams,  private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubircontenidoPage');
  }

  Mostrar($event){  
     //Función que coge el fichero seleccionado y leerlo mediante FileReader para dejar su información en la variable foto, de donde posteriormente se alimentara la imagen 
    this.file = $event.target.files[0];
    console.log ('fichero' +this.file.name);
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload =() => {
      console.log ('ya');
      this.foto =reader.result.toString();
    }

  }

  Subirfoto(){
    this.Idfoto= 1;
    this.idpublicacion =1;
    let fotografias = { Idfoto:this.Idfoto, Foto: this.file.name, Descripcion:this.descripcion, Rol:this.rol, 
                        Web: this.web, Nota:this.nota, Positivo:this.positivo, Negativo: this.negativo, 
                        Dia: this.dia, Idpublicacion: this.idpublicacion};

     this.http.post<any>(this.APIUrl, fotografias).subscribe();

  // Subir foto al contenedor de imagenes 
  const formData: FormData = new FormData(); //utilizamos objeto de la clase formData
  formData.append(this.file.name, this.file); //le pasamos nombre fichero y el propio fichero
  // este objeto será lo que enviamos posteriormente al post del contenedor de imagenes
  //enviamos la foto a nuestro contenedor fotospublicaciones
  this.http.post('http://localhost:3000/api/imagenes/fotospublicaciones/upload', formData).subscribe(() => console.log('subida a contenedor'));
  
  

  }

}
