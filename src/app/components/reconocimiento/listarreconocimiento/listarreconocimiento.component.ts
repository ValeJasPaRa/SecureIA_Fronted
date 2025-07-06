import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Reconocimiento } from '../../../models/reconocimiento';
import { ReconocimientoService } from '../../../services/reconocimiento.service';

@Component({
  selector: 'app-listarreconocimiento',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule],
  templateUrl: './listarreconocimiento.component.html',
  styleUrl: './listarreconocimiento.component.css'
})
export class ListarreconocimientoComponent implements OnInit{

 cantidadRegistros: number = 0; //pr mostrar cant de registros*
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7']; 
 dataSource: MatTableDataSource<Reconocimiento>=new MatTableDataSource();
  
  constructor(private recoS:ReconocimientoService ){}
         
    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.recoS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
             this.cantidadRegistros = data.length; //cant de registros*
          })

      this.recoS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //paginator
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
    this.recoS.delete(id).subscribe(data=>{
      this.recoS.list().subscribe(data=> this.recoS.setList(data))

    })
  }
}
