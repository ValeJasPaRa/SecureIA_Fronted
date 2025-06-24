import { Routes } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditarrol/insertareditarrol.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertareditarusuarioComponent } from './components/usuario/insertareditarusuario/insertareditarusuario.component';
import { InmuebleComponent } from './components/inmueble/inmueble.component';
import { InsertareditarinmuebleComponent } from './components/inmueble/insertareditarinmueble/insertareditarinmueble.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { InsertareditaractividadComponent } from './components/actividad/insertareditaractividad/insertareditaractividad.component';
import { PerfilusuarioComponent } from './components/perfilusuario/perfilusuario.component';
import { InsertareditarperfilusuarioComponent } from './components/perfilusuario/insertareditarperfilusuario/insertareditarperfilusuario.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { InsertareditargeolocalizacionComponent } from './components/geolocalizacion/insertareditargeolocalizacion/insertareditargeolocalizacion.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'roles',pathMatch:'full'
    },
    {path:'roles',component:RolComponent,
        children:[
            {
                path:'nuevo',component:InsertareditarrolComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarrolComponent
            }
        ]
    },

    {path:'usuarios',component:UsuarioComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarusuarioComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarusuarioComponent
            }
        ]
    },

    {path:'inmuebles',component:InmuebleComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarinmuebleComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarinmuebleComponent
            }
        ]
    },
    {path:'actividades',component:ActividadComponent,
          children:[
            {
                path:'nuevo',component:InsertareditaractividadComponent
            },
            {
                path:'ediciones/:id', component:InsertareditaractividadComponent
            }
        ]
    },
    {path:'perfilusuario',component:PerfilusuarioComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarperfilusuarioComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarperfilusuarioComponent
            }
        ]
    },
    {path:'geolocalizaciones',component:GeolocalizacionComponent,
          children:[
            {
                path:'nuevo',component:InsertareditargeolocalizacionComponent
            },
            {
                path:'ediciones/:id', component:InsertareditargeolocalizacionComponent
            }
        ]
    }

];
