import { Component, OnInit } from '@angular/core';
import { DepartementDto } from 'src/app/models/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';
import { MeteoUpdateDto } from 'src/app/models/meteo-update-dto';

@Component({
  selector: 'app-meteo-dep',
  templateUrl: './meteo-dep.component.html',
  styleUrls: ['./meteo-dep.component.css']
})
export class MeteoDepComponent implements OnInit {

  departement : DepartementDto;
  allmeteo= new Array<MeteoUpdateDto>();

  constructor(private service : DepartementService) { }

  ngOnInit(): void {
    this.getMeteo();
    this.departement=this.service.departement;
    
  }

  getMeteo(): void {
    this.service.getMeteoByDepartement(this.departement.depNum).subscribe(
      responseDto => {
         if (!responseDto.error) {
           this.allmeteo = responseDto.body;
         }
         else { this.allmeteo = [] }
       }
     );
  }

}
