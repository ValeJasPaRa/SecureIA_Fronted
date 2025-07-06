import { Injectable } from '@angular/core';
import { Grabacion } from '../models/grabacion';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { enviroment } from '../../environments/environment';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class GrabacionService {


  private url=`${base_url}/grabacion`

  private listaCambio =new Subject<Grabacion[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Grabacion[]>(`${this.url}/listar`);
  }

  insert(GRAB: Grabacion) {
  return this.http.post(`${this.url}/insertar`, GRAB);
  }

  setList(listaNueva:Grabacion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Grabacion>(`${this.url}/listarid/${id}`);
  }

  update(grabACT:Grabacion){
    return this.http.put(`${this.url}/modificar`,grabACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }
}
