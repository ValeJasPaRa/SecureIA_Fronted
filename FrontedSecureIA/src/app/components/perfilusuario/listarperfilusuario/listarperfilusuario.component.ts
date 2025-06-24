import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PerfilusuarioService } from '../../../services/perfilusuario.service';
import { PerfilUsuario } from '../../../models/perfilusuario';

@Component({
  selector: 'app-listarperfilusuario',
  imports: [MatTableModule,RouterLink,MatButtonModule,MatIconModule,MatPaginatorModule,MatSortModule],
  templateUrl: './listarperfilusuario.component.html',
  styleUrl: './listarperfilusuario.component.css'
})
export class ListarperfilusuarioComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2','c3','c4','c5', 'c6','c7','c8','c9'];
  dataSource: MatTableDataSource<PerfilUsuario>=new MatTableDataSource();
  constructor(private perusuS:PerfilusuarioService){}

     //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 


    ngOnInit(): void {
      this.perusuS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort        
      })
      
      //para el eliminar
      this.perusuS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
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
    this.perusuS.deleteA(id).subscribe(data=>{
      this.perusuS.list().subscribe(data=> this.perusuS.setList(data))

    })
  }
}
