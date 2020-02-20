import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { t } from '@angular/core/src/render3';
import { CrearviajeProvider } from '../../providers/crearviaje/crearviaje';
import { UrlProvider } from '../../providers/url/url';
import { Fotografia } from '../../app/Fotografia';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the FotosviajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fotosviaje',
  templateUrl: 'fotosviaje.html',
})
export class FotosviajePage {

  NomUsu: string;
  publicacion:string []=[];
  rol: string;
  descripcion:string;
  web:string;
  nota:number;
  positivo:string;
  negativo:string;
  ruta:string;
  portada:boolean;
  Idfoto:number;
  foto:string;
  idpublicacion:number;
  file:File;
  imagen:string;
  listafotos:number []=[1];
  rutas:any;
  listapuntosruta:any[]=[];
  // CAMPOS DE LA FOTOGRAFIA
  listaIdfoto: number[]=[];
  listafoto: string[]=[];
  listadescripcion: string[]=[];
  listarol: string[]=[];
  listaweb: string[]=[];
  listanota: number[]=[];
  listapositivo: string[]=[];
  listanegativo: string[]=[];
  listaportada: boolean[]=[];
  listaruta: string[]=[];
  //idpublicacion:number;
  fotografia={Idfoto:this.Idfoto, Foto: this.foto, Descripcion: this.descripcion, Rol: this.rol, Web: this.web, Nota: this.nota, Positivo: this.positivo, Negativo: this.negativo,   Portada: this.portada, puntoruta: this.ruta, Idpublicacion: this.idpublicacion};
  listaf: Fotografia[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public CrearviajeProvider: CrearviajeProvider,public UrlProvider: UrlProvider ) {
   
    this.NomUsu= navParams.get('Nom');
    this.publicacion= navParams.get('Publi');
    this.rutas = navParams.get('Rutas');
    this.idpublicacion=navParams.get('Idpubli');
    console.log(this.NomUsu);
    console.log(this.publicacion);
    console.log(this.idpublicacion);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotosviajePage');
    this.listapuntosruta= this.rutas.split(";;");
    this.listapuntosruta.length= this.listapuntosruta.length-1;
    console.log(this.listapuntosruta);

    
      //ENCONTRAR ID FOTO
      this.UrlProvider.getAllFotos().subscribe( 
        res=>{  // guardamos id ultima foto
           this.Idfoto= res[res.length-1].Idfoto;
           this.Idfoto= this.Idfoto+1;
           console.log(this.Idfoto);
         });
  }

  Activarinput(){
    // hacemos click en el boton que esta invisible para el usuario
    console.log('activar input');
    document.getElementById('inp').click();
  }

  Mostrar($event){  
    //Función que coge el fichero seleccionado y leerlo mediante FileReader para dejar su información en la variable foto, de donde posteriormente se alimentara la imagen 
   this.file = $event.target.files[0];
   console.log ('fichero' +this.file.name);
   const reader = new FileReader();
   reader.readAsDataURL(this.file);
   reader.onload =() => {
     console.log ('ya');
     this.imagen =reader.result.toString();
   }

    this.Subircontenedor();

 }

 Subircontenedor(){
    this.UrlProvider.subirImgPubli(this.file.name, this.file);
   // this.fotografia.Foto= this.file.name;
 }


 PonFoto(){
  this.listafotos.push(1);
  
  }



  Subirpublicacion(){
    let Foto;
    this.foto="hola";
   for(var i=0; i < this.listafotos.length; i++){
      this.Idfoto= this.Idfoto+i;
      console.log(this.Idfoto);

            //Creamos la fotografia
             Foto= new Fotografia(this.Idfoto, this.foto, this.listadescripcion[i], this.listarol[i], this.listaweb[i],
              this.listanota[i], this.listapositivo[i], this.listanegativo[i], this.listapuntosruta[i], this.listaportada[i], 
              this.idpublicacion);
              console.log(Foto);
              this.listaf.push(Foto);
              console.log(this.listaf);
    
            //Subir fotografia 
            this.UrlProvider.SubirFoto(this.listaf[i]);
    
   }
   
  }


  Continuar(){

    let Nombreusuario = { Nom:this.NomUsu };
    let publicaciones={Publi:this.publicacion};

  }


}
