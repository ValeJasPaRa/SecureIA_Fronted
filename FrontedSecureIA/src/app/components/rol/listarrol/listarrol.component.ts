import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule,RouterLink,MatButtonModule,MatIconModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})

export class ListarrolComponent implements OnInit{

  displayedColumns: string[] = ['c1', 'c2','c3','c4'];
  dataSource: MatTableDataSource<Rol>=new MatTableDataSource();
  
  constructor(private rS:RolService){}

    ngOnInit(): void {
      this.rS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data)})
      
      //para el eliminar
      this.rS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data)})
  }

  
  eliminar(id:number){
    this.rS.deleteA(id).subscribe(data=>{
      this.rS.list().subscribe(data=> this.rS.setList(data))

    })
  }

}
