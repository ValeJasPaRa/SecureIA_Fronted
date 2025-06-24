import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Geolocalizacion } from '../../../models/geolocalizacion';
import { Inmueble } from '../../../models/inmueble';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InmuebleService } from '../../../services/inmueble.service';


@Component({
  selector: 'app-insertareditargeolocalizacion',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditargeolocalizacion.component.html',
  styleUrl: './insertareditargeolocalizacion.component.css'
})
export class InsertareditargeolocalizacionComponent implements OnInit {

  form: FormGroup=new FormGroup({})
  geoloca:Geolocalizacion=new Geolocalizacion()
  listadeInmuebles:Inmueble[]=[] //para la lista A SELECCIONAR


  id:number=0 //listid
  edicion:boolean=false//edicion

    constructor(
        private geoS:GeolocalizacionService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private inmS:InmuebleService, //service del FK
        private route:ActivatedRoute
      ) { }


  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodGeo:[''], //solo de muestra
        Lat:['',Validators.required],
        Lon:['',Validators.required],
        Direcc:['',Validators.required],
        Refer:['',Validators.required],
        idInmuebleGEO:['',Validators.required]
      })

      this.inmS.list().subscribe(data=>{
        this.listadeInmuebles=data //carga la lista de inmuebles
      })

  }


  aceptar(){
  if(this.form.valid){
    this.geoloca.id_geo=this.form.value.CodGeo
    this.geoloca.latitud=this.form.value.Lat
    this.geoloca.longitud=this.form.value.Lon
    this.geoloca.direccion_geo=this.form.value.Direcc
    this.geoloca.referencia_geo=this.form.value.Refer
    this.geoloca.id_inmueble.id_inmueble = this.form.value.idInmuebleGEO;

     if(this.edicion){
        this.geoS.update(this.geoloca).subscribe(data=>{
           this.geoS.list().subscribe(data=>{
             this.geoS.setList(data)})
        })
      } else{
        this.geoS.insert(this.geoloca).subscribe(data=>{
            this.geoS.list().subscribe(data=>{
              this.geoS.setList(data)})
        })
      } 

      this.router.navigate(['geolocalizaciones'])
  }}



  // listID
  init(){
    if(this.edicion){
      this.geoS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodGeo:new FormControl(data.id_geo), //solo de muestra
            Lat:new FormControl(data.latitud),
            Lon:new FormControl(data.longitud),
            Direcc:new FormControl(data.direccion_geo),
            Refer:new FormControl(data.referencia_geo),
            idInmuebleGEO:new FormControl(data.id_inmueble.id_inmueble)
        })
      })
    }
  }
}
