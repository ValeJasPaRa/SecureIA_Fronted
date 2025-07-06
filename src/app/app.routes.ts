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
import { ZonadeteccionComponent } from './components/zonadeteccion/zonadeteccion.component';
import { InsertareditarzonadeteccionComponent } from './components/zonadeteccion/insertareditarzonadeteccion/insertareditarzonadeteccion.component';
import { DispositivoComponent } from './components/dispositivo/dispositivo.component';
import { InsertareditardispositivoComponent } from './components/dispositivo/insertareditardispositivo/insertareditardispositivo.component';
import { EventoDispositivo } from './models/eventodispositivo';
import { EventodispositivoComponent } from './components/eventodispositivo/eventodispositivo.component';
import { InsertareditareventodispositivoComponent } from './components/eventodispositivo/insertareditareventodispositivo/insertareditareventodispositivo.component';
import { ReconocimientoComponent } from './components/reconocimiento/reconocimiento.component';
import { InsertareditarreconocimientoComponent } from './components/reconocimiento/insertareditarreconocimiento/insertareditarreconocimiento.component';
import { GrabacionComponent } from './components/grabacion/grabacion.component';
import { InsertareditargrabacionComponent } from './components/grabacion/insertareditargrabacion/insertareditargrabacion.component';

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
    },
    {path:'zonasdetec',component:ZonadeteccionComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarzonadeteccionComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarzonadeteccionComponent
            }
        ]
    },
    {path:'dispositivos',component:DispositivoComponent,
          children:[
            {
                path:'nuevo',component:InsertareditardispositivoComponent
            },
            {
                path:'ediciones/:id', component:InsertareditardispositivoComponent
            }
        ]
    },
    {path:'eventos',component:EventodispositivoComponent,
          children:[
            {
                path:'nuevo',component:InsertareditareventodispositivoComponent
            },
            {
                path:'ediciones/:id', component:InsertareditareventodispositivoComponent
            }
        ]
    },
    {path:'reconocimientos',component:ReconocimientoComponent,
          children:[
            {
                path:'nuevo',component:InsertareditarreconocimientoComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarreconocimientoComponent
            }
        ]
    },
    {path:'grabaciones',component:GrabacionComponent,
          children:[
            {
                path:'nuevo',component:InsertareditargrabacionComponent
            },
            {
                path:'ediciones/:id', component:InsertareditargrabacionComponent
            }
        ]
    }


];
