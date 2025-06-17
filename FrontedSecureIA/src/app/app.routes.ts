import { Routes } from '@angular/router';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarrolComponent } from './components/rol/insertareditarrol/insertareditarrol.component';

export const routes: Routes = [

        {path:'roles',component:RolComponent,
        children:[
            {path:'nuevo',component:InsertareditarrolComponent},

            {path:'ediciones/:id',component:InsertareditarrolComponent}
        ]

    }
];
