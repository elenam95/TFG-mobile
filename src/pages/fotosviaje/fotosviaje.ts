import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { t } from '@angular/core/src/render3';
import { CrearviajeProvider } from '../../providers/crearviaje/crearviaje';
import { UrlProvider } from '../../providers/url/url';
import { Fotografia } from '../../app/Fotografia';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import {PerfilPage} from '../perfil/perfil';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { isRightSide, isTrueProperty } from 'ionic-angular/umd/util/util';
import {ComprobarInputsProvider} from '../../providers/comprobar-inputs/comprobar-inputs';
import { empty } from 'rxjs/Observer';

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
  Idfoto:number;
  foto:string;
  idpublicacion:number;
  file:File;
  imagen:string[]=[];
  listafotos:number []=[1];
  rutas:any;
  listapuntosruta:any[]=[];
  posicion: number;
  contador: number =0;
  encontrado: boolean = false;
  // CAMPOS DE LA FOTOGRAFIA
  listaIdfoto: number[]=[];
  listafoto: string[]=[];
  listadescripcion: string[]=[];
  listarol: string[]=[];
  listaweb: string[]=[];
  listanota: number[]=[];
  listapositivo: string[]=[];
  listanegativo: string[]=[];
  listaportada: any[]=[];
  listaruta: string[]=[];
  listaf: Fotografia[]=[];
  listafile: File []=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public http: HttpClient, public CrearviajeProvider: CrearviajeProvider,
              public UrlProvider: UrlProvider, public alertCtrl: AlertController, public ComprobarInputsProvider: ComprobarInputsProvider ) {
   
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

  Activarinput(i: number){
    // hacemos click en el boton que esta invisible para el usuario
    console.log('activar input');
    document.getElementById('inp').click();
    this.posicion= i;
    console.log(this.posicion)
  }

  Mostrar($event){  
    //Función que coge el fichero seleccionado y leerlo mediante FileReader para dejar su información en la variable foto, de donde posteriormente se alimentara la imagen 
  
    this.file = $event.target.files[0];
    console.log ('fichero' +this.file.name);
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload =() => {
      console.log ('ya');
 //     this.imagen.push(reader.result.toString()) ;
        this.imagen[this.posicion]= reader.result.toString();
    }
 //   this.listafile.push(this.file);
    this.listafile[this.posicion]= this.file;
    console.log(this.listafile);
  

 }


 PonFoto(){
  this.listafotos.push(1); 
  }

  ComprobarCamposVacios(){
    let res; 
    res = this.ComprobarInputsProvider.FotosViaje(this.listafotos.length, this.listarol, this.listanota, this.listaruta);
    if(res == "OK"){
      this.ComprobarPortada();
    }
  }

  ComprobarPortada (){

    var cont= 0;
    console.log(this.listaportada)

    for(var i=0; i < this.listaportada.length; i++){
          console.log(this.listaportada[i])

          if (this.listaportada[i]=="true"){
                console.log("encontrado")
                cont ++;
          }
    }
    console.log(cont);
    if(cont == 0){
              const alert = this.alertCtrl.create({

                      title: 'Error',

                      subTitle: 'Debe haber una foto seleccionada como foto de portada',

                      buttons: ['OK']

              });

              alert.present();
              console.log("Error: no hay foto de portada");

    }else if(cont >= 2){
             const alert = this.alertCtrl.create({

                        title: 'Error',

                        subTitle: 'No puede haber más de una foto de portada seleccionada',

                        buttons: ['OK']

              });

            alert.present();
            console.log("Error: hay mas de una portada");
    } else{
          
         //subimos publicacion
         this.ComprobarCampoFotos();
     }


  }



  ComprobarCampoFotos(){
    // Comprobar que han subido fotos
    let contador=0;
    console.log(this.listafile)
    if(this.listafile.length == 0){
            const alert = this.alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Debes de seleccionar una fotografia',
                  buttons: ['OK']
             });
            alert.present();
    } else{
          for (var i=0; i < this.listafotos.length; i++){

               if (this.listafile[i] == undefined){
                      contador++;
                      const alert = this.alertCtrl.create({
                             title: 'Error',
                             subTitle: 'Debes de seleccionar una fotografia',
                             message: 'Foto número ' +i,
                             buttons: ['OK']
                       });
                       alert.present();
              }
          }

          if (contador == 0){
            this.Comprobarfotos();
          }
    }
   
  
 
  }

Comprobarfotos(){
  for(var j=0; j < this.listafotos.length; j++){

    //Comprobar si nombre foto ya existe
    this.UrlProvider.getImgPubli(this.listafile[j].name).subscribe(
     res => {
               if(res!= null){
                 console.log("Foto ya existente")
                 const alert = this.alertCtrl.create({
                         title: 'Error',
                         subTitle: 'Ya existe una fotografia con este nombre, porfavor modifique el nombre de la  antes de subirlo',
                         message: 'Foto' +j,
                         buttons: ['OK']
                       });
                 alert.present();
               }
       }, (err) =>{
                   console.log("Foto no existente, subimos foto")
                   this.contador++;
                   this.SubirPublicacion();

       });
   }
}

SubirPublicacion(){
  let Foto;
  var cont=0;
  var img=0;
  if (this.contador == this.listafotos.length){
    console.log("Podemos subir ")
  // Subir publicacion 
  this.UrlProvider.subirPublicacion(this.publicacion).subscribe(
    () => {
            console.log("pulicacion subida")
            for(var i=0; i < this.listafotos.length; i++){
              this.Idfoto= this.Idfoto+i;
              console.log(this.Idfoto);
        
                                //Creamos la fotografia
                              Foto= new Fotografia(this.Idfoto, this.listafile[i].name, this.listadescripcion[i], this.listarol[i], this.listaweb[i],
                              this.listanota[i], this.listapositivo[i], this.listanegativo[i], this.listaruta[i], this.listaportada[i], 
                              this.idpublicacion);
                              this.listaf.push(Foto);
                              console.log(this.listaf);
                              console.log(this.listaruta);
                              //Subir fotografia 
                              this.UrlProvider.SubirFoto(this.listaf[i]).subscribe(
                                () => { console.log('foto subida');         
                              }, (err)=> {cont++;
                                          this.Error("fotografia", cont);
                              });
                              //Subir img contenedor
                              this.UrlProvider.subirImgPubli(this.listafile[i].name,  this.listafile[i]).subscribe(
                                () => {console.log("foto subida contenedor");
                                        img++;
                                        if(img == this.listafotos.length){
                                          let Nombreusuario = { Nom:this.NomUsu };
                                          // Abre la pagina perfil y le pasa el parametro NomUsu
                                          this.navCtrl.push(PerfilPage, {Nom: Nombreusuario.Nom} );

                                        }
                              
                                }, (err)=> {
                                 this.Error("img contenedor", cont);
                                  
                                
                             });


                     
           }
          
            

          }, (err)=> { cont++;
                        this.Error("publicacion", cont);
                        
          });

    
}
}



Error(nom: string, contador: number){

  if(contador==1){

    console.log("ERROR: " + nom + " no subida");
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Ha habido un error en la subida de la publicación. Por favor revise todos los campos y vuelva a intentarlo.',
      buttons: ['OK']
     });
    alert.present();

    if(nom !== "publicacion"){
         this.UrlProvider.EliminarPubli(this.idpublicacion).subscribe(
            ()=> console.log("publicacion eliminada"));

          for(var i=0; i < this.listafile.length; i++){
              this.UrlProvider.EliminarImgPubli(this.listafile[i].name).subscribe(
              ()=> console.log("img eliminada"));
          }

    }
  }


}
 

}
