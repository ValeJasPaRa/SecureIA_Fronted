import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Inmueble } from '../../../models/inmueble';
import { InmuebleService } from '../../../services/inmueble.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarinmueble',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,MatPaginatorModule,MatSortModule],
  templateUrl: './listarinmueble.component.html',
  styleUrl: './listarinmueble.component.css'
})
export class ListarinmuebleComponent implements OnInit{
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7'];
 dataSource: MatTableDataSource<Inmueble>=new MatTableDataSource();

  constructor(private iS:InmuebleService){}

    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.iS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
          })

      this.iS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.iS.deleteA(id).subscribe(data=>{
      this.iS.list().subscribe(data=> this.iS.setList(data))

    })
  }
 
}
