import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { GeolocalizacionService } from '../../../services/geolocalizacion.service';
import { Geolocalizacion } from '../../../models/geolocalizacion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listargeolocalizacion',
  imports: [MatTableModule,MatIconModule,RouterLink,MatButtonModule,
    MatPaginatorModule,MatSortModule,MatCardModule,CommonModule],
  templateUrl: './listargeolocalizacion.component.html',
  styleUrl: './listargeolocalizacion.component.css'
})
export class ListargeolocalizacionComponent implements OnInit{
 displayedColumns: string[] = ['c1', 'c2','c3','c4', 'c5','c6','cMapa','c7','c8']; //agrega consultaAPI
 dataSource: MatTableDataSource<Geolocalizacion>=new MatTableDataSource();

  listadeGeos:Geolocalizacion[]=[] // lista para la consultaAPI
  idMapaVisible: number | null = null;
  urlMapa: SafeResourceUrl = '';

  constructor(private geoS:GeolocalizacionService,
     private sanitizer: DomSanitizer //para la consultaAPI
    ){}
         
  verEnMapa(lat: number, lon: number, id: number): void {
      if (this.idMapaVisible === id) {
    // para cerrar al doble click
    this.idMapaVisible = null;
    } else{
      const url = `https://maps.google.com/maps?q=${lat},${lon}&z=16&output=embed`;
      this.urlMapa = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.idMapaVisible = id; // Solo se muestra el mapa si este ID coincide
  }}
  
    //agregado para el paginator
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 

    ngOnInit(): void {
      this.geoS.list().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
            //agregado para el paginator 
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
          })

      this.geoS.getList().subscribe(data =>{this.dataSource=new MatTableDataSource(data);
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
    this.geoS.delete(id).subscribe(data=>{
      this.geoS.list().subscribe(data=> this.geoS.setList(data))

    })
  }
}
