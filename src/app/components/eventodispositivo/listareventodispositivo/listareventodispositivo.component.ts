import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { EventoDispositivo } from '../../../models/eventodispositivo';
import { EventodispositivoService } from '../../../services/eventodispositivo.service';

@Component({
  selector: 'app-listareventodispositivo',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule],
  templateUrl: './listareventodispositivo.component.html',
  styleUrl: './listareventodispositivo.component.css'
})
export class ListareventodispositivoComponent implements OnInit{
displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','c7','c8']; 
 dataSource: MatTableDataSource<EventoDispositivo>=new MatTableDataSource();
  
  constructor(private eventS:EventodispositivoService ){}
         
    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.eventS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
          })

      this.eventS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.eventS.delete(id).subscribe(data=>{
      this.eventS.list().subscribe(data=> this.eventS.setList(data))

    })
  }

}
