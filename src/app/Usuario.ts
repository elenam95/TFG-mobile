import { ThrowStmt } from '@angular/compiler';
export class Usuario{
    Nombre: string;
    Pass: string;
    Rol: string;
    NomUsu: string;
    Mail:string;
    Fotousu:string;
    Perfil:boolean;
    

    constructor ( NomUsu: string, nombre: string, mail:string, rol: string, pass: string, fotousu:string, perfil:boolean ){
        this.NomUsu = NomUsu;
        this.Nombre = nombre;
        this.Mail = mail;
        this.Rol = rol;
        this.Pass = pass;
        this.Fotousu = fotousu;
        this.Perfil = perfil;
    }
}