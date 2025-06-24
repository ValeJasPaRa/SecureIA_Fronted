import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../models/usuario';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSort, MatSortModule } from '@angular/material/sort'; //paginator
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; //paginator

@Component({
  selector: 'app-listarusuario',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,MatPaginatorModule,MatSortModule],
  templateUrl: './listarusuario.component.html',
  styleUrl: './listarusuario.component.css'
})
export class ListarusuarioComponent implements OnInit {
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7','c8', 'c9','c10','c11'];
 dataSource: MatTableDataSource<Usuario>=new MatTableDataSource();
  
  constructor(private uS:UsuarioService){}

    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.uS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
          })

      this.uS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
      })
    }
  
    //agregado para el paginator 
    ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
    
  eliminar(id:number){
    this.uS.deleteA(id).subscribe(data=>{
      this.uS.list().subscribe(data=> this.uS.setList(data))

    })
  }

}
