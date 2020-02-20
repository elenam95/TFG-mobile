import { ThrowStmt } from '@angular/compiler';
export class Fotografia{
    Idfoto:number;
    Foto:string;
    Descripcion:string;
    Rol: string;
    Web:string;
    Nota:number;
    Positivo:string;
    Negativo:string;
    puntoruta:string;
    Portada:boolean;
    Idpublicacion:number;
  
    

    constructor (  Idfoto:number, Foto:string, Descripcion:string, Rol: string, Web:string, Nota:number, 
                    Positivo:string, Negativo:string, Ruta:string, Portada:boolean, Idpublicacion:number){
        this.Idfoto = Idfoto;
        this.Foto = Foto;
        this.Descripcion = Descripcion;
        this.Rol = Rol;
        this.Web = Web;
        this. Nota =  Nota;
        this.Positivo = Positivo;
        this.Negativo = Negativo;
        this.puntoruta = Ruta;
        this.Portada =Portada;
        this.Idpublicacion =Idpublicacion;
    }
}