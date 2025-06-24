import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';


const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

 private url=`${base_url}/usuario`

  private listaCambio =new Subject<Usuario[]>

  constructor(private http:HttpClient) { }


  list() {
    return this.http.get<Usuario[]>(`${this.url}/listar`);
    }
  
    insert(u: Usuario) {
    return this.http.post(`${this.url}/insertar`, u);
    }
  
    setList(listaNueva:Usuario[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
     return this.listaCambio.asObservable()
    }
  
    listId(id:number){
      return this.http.get<Usuario>(`${this.url}/listarid/${id}`);
    }
  
    update(uact:Usuario){
      return this.http.put(`${this.url}/modificar`,uact) 
    }
  
    deleteA(id:number){
      return  this.http.delete(`${this.url}/eliminar/${id}`)
    }
}
