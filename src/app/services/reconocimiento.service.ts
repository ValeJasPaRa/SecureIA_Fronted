import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Reconocimiento } from '../models/reconocimiento';
import { HttpClient } from '@angular/common/http';

const base_url=enviroment.base //base

@Injectable({
  providedIn: 'root'
})
export class ReconocimientoService {


  private url=`${base_url}/reconocimiento`

  private listaCambio =new Subject<Reconocimiento[]>

  constructor(private http:HttpClient) { }


  list() {
  return this.http.get<Reconocimiento[]>(`${this.url}/listar`);
  }

  insert(RECO: Reconocimiento) {
  return this.http.post(`${this.url}/insertar`, RECO);
  }

  setList(listaNueva:Reconocimiento[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
   return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Reconocimiento>(`${this.url}/listarid/${id}`);
  }

  update(recoACT:Reconocimiento){
    return this.http.put(`${this.url}/modificar`,recoACT) 
  }

  delete(id:number){
    return  this.http.delete(`${this.url}/eliminar/${id}`)
  }
}
