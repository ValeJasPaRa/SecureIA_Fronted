import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Zonadeteccion } from '../models/zonadeteccion';
import { enviroment } from '../../environments/environment';

const base_url=enviroment.base 

@Injectable({
  providedIn: 'root'
})

export class ZonadeteccionService {

  private url=`${base_url}/zona_deteccion`

  private listaCambio =new Subject<Zonadeteccion[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Zonadeteccion[]>(`${this.url}/listar`);
  }

  insert(zon: Zonadeteccion) {
  return this.http.post(`${this.url}/insertar`, zon);
  }

  setList(listaNueva:Zonadeteccion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Zonadeteccion>(`${this.url}/listarid/${id}`);
  }

  update(zonaACT:Zonadeteccion){
    return this.http.put(`${this.url}/modificar`,zonaACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }
}
