import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Inmueble } from '../../../models/inmueble';
import { Usuario } from '../../../models/usuario';
import { InmuebleService } from '../../../services/inmueble.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-insertareditarinmueble',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,MatSelectModule,
    MatButtonModule],
  templateUrl: './insertareditarinmueble.component.html',
  styleUrl: './insertareditarinmueble.component.css'
})
export class InsertareditarinmuebleComponent implements OnInit{

  form: FormGroup=new FormGroup({})
  inmueble:Inmueble=new Inmueble()
  listadeUsuarios:Usuario[]=[] //para la lista A SELECCIONAR

  id:number=0 //listid
  edicion:boolean=false//edicion

  //para la seleccion de tipoInmueble

    tiposdeInmuebles:{value:string;viewValue:string}[]=[
      {value:'Casa',viewValue:'Casa'},
      {value:'Departamento',viewValue:'Departamento'},
      {value:'Oficina',viewValue:'Oficina'},
      {value:'Almacén',viewValue:'Almacén'},
      {value:'Otro',viewValue:'Otro'}
    ]

    
    constructor(
        private inmubS:InmuebleService,
        private formBuilder:FormBuilder,
        private router:Router, //de angular
        private usuS:UsuarioService, //service del FK
        private route:ActivatedRoute
      ) { }

  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        CodigoInmu:[''], //solo de muestra
        nombreInmu:['',Validators.required],
        DireccInmu:['',Validators.required],
        tipo_inmu:['',Validators.required],
        idUserINMU:['',Validators.required]
      })

      this.usuS.list().subscribe(data=>{
        this.listadeUsuarios=data //carga la lista de usuarios
      })

  }


  aceptar(){
  if(this.form.valid){
    this.inmueble.id_inmueble=this.form.value.CodigoInmu
    this.inmueble.nombre_inmueble=this.form.value.nombreInmu
    this.inmueble.direccion_inmueble=this.form.value.DireccInmu
    this.inmueble.tipo_inmueble=this.form.value.tipo_inmu
    this.inmueble.id_usuario.id_usuario=this.form.value.idUserINMU

     if(this.edicion){
        this.inmubS.update(this.inmueble).subscribe(data=>{
           this.inmubS.list().subscribe(data=>{
             this.inmubS.setList(data)})
        })
      } else{
        this.inmubS.insert(this.inmueble).subscribe(data=>{
            this.inmubS.list().subscribe(data=>{
              this.inmubS.setList(data)})
        })
      } 

      this.router.navigate(['inmuebles'])
  }}


  // listID
  init(){
    if(this.edicion){
      this.inmubS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
            CodigoInmu:new FormControl(data.id_inmueble), //solo de muestra
            nombreInmu:new FormControl(data.nombre_inmueble),
            DireccInmu:new FormControl(data.direccion_inmueble),
            tipo_inmu:new FormControl(data.tipo_inmueble),
            idUserINMU:new FormControl(data.id_usuario.id_usuario)
        })
      })
    }
  }

}
