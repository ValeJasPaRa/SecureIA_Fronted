import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon'; //agregado para los ...
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarusuario',
  providers: [provideNativeDateAdapter()], //se agrega en el insertar
  imports: [MatInputModule,
    MatFormFieldModule,
    CommonModule,MatRadioModule,
    ReactiveFormsModule,FormsModule,MatSelectModule,MatDatepickerModule,MatButtonModule,MatIconModule],
  templateUrl: './insertareditarusuario.component.html',
  styleUrl: './insertareditarusuario.component.css'
})

export class InsertareditarusuarioComponent implements OnInit {

  //snackbar//
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string,message2:string) {
    this._snackBar.open(message,message2);
  } //

  form: FormGroup=new FormGroup({})
  valorDefecto:string="" //del ngmodel
  usuario:Usuario=new Usuario()
  listaRoles:Rol[]=[] //para la lista A SELECCIONAR

  id:number=0 //listid
  edicion:boolean=false//edicion

  hide: boolean = true//para los ... de la contraseña


  constructor(
    private usS:UsuarioService,
    private formBuilder:FormBuilder,
    private router:Router,
    private roS:RolService,
    private route:ActivatedRoute
  ) { }


  ngOnInit(): void {

      this.route.params.subscribe((data:Params)=>{
       this.id=data['id'] 
       this.edicion=data['id']!=null 
       this.init()  
      })

      this.form=this.formBuilder.group({
        Codigouser:[''], //solo de muestra
        nombref:['',Validators.required],
        dnif:['',Validators.required],
        correof:['',Validators.required],
        sexof:['',Validators.required],
        telefonof:['',Validators.required],
        direccionf:['',Validators.required],
        imgf:['',Validators.required],
        passwordf:['',Validators.required],
        fecha_regf:['',Validators.required],
        idrolf:['',Validators.required]
      })

      this.roS.list().subscribe(data=>{
        this.listaRoles=data //carga la lista de roles
      })

  }


  aceptar(){
  if(this.form.valid){
    this.usuario.id_usuario=this.form.value.Codigouser
    this.usuario.nombre_usuario=this.form.value.nombref
    this.usuario.dni_usuario=this.form.value.dnif
    this.usuario.correo_usuario=this.form.value.correof
    this.usuario.sexo_usuario=this.form.value.sexof
    this.usuario.telefono_usuario=this.form.value.telefonof
    this.usuario.direccion_usuario=this.form.value.direccionf
    this.usuario.img_url_usuario=this.form.value.imgf
    this.usuario.password_usuario=this.form.value.passwordf
    this.usuario.fechaRegistro_usuario=this.form.value.fecha_regf
    this.usuario.id_rol.id_rol=this.form.value.idrolf

     if(this.edicion){
        this.usS.update(this.usuario).subscribe(data=>{
           this.usS.list().subscribe(data=>{
             this.usS.setList(data)})
             this.openSnackBar('Se actualizó con éxito', 'Aceptar');
        })
      } else{
        this.usS.insert(this.usuario).subscribe(data=>{
            this.usS.list().subscribe(data=>{
              this.usS.setList(data)})
              this.openSnackBar('Registrado con éxito', 'Aceptar');

        })
      } 

      this.router.navigate(['usuarios'])
  }}


  // listID
  init(){
    if(this.edicion){
      this.usS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
           Codigouser: new FormControl(data.id_usuario),
           nombref: new FormControl(data.nombre_usuario),
           dnif: new FormControl(data.dni_usuario),
           correof: new FormControl(data.correo_usuario),
           sexof: new FormControl(data.sexo_usuario),
           telefonof: new FormControl(data.telefono_usuario),
           direccionf: new FormControl(data.direccion_usuario),
           imgf: new FormControl(data.img_url_usuario),
           passwordf: new FormControl(data.password_usuario),
           fecha_regf: new FormControl(data.fechaRegistro_usuario),
           idrolf: new FormControl(data.id_rol.id_rol),
        })
      })
    }
  }
}
