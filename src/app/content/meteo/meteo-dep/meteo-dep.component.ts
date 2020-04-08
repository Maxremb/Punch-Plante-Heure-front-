import { Component, OnInit } from '@angular/core';
import { DepartementDto } from 'src/app/models/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';
import { MeteoUpdateDto } from 'src/app/models/meteo-update-dto';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meteo-dep',
  templateUrl: './meteo-dep.component.html',
  styleUrls: ['./meteo-dep.component.css']
})
export class MeteoDepComponent implements OnInit {

  departement: DepartementDto;
  allmeteo = new Array<MeteoUpdateDto>();
  numelem: number = 30;
  page: number = 0;
  sortname: string = 'date';
  choixDonnee: FormGroup;
  parMois: boolean = false;
  month: number;
  tableau: boolean;
  graph: boolean;
  data: any;
  title = '';
  type = 'ComboChart';
  columnNames = ['date', 'ensoleillement', 'precipitation', 'Temperature min', 'Temperature max'];
  options = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Temperature'
    },
    seriesType: 'lines',
    series: { 1: { type: 'bars' }, 0: { type: 'bars' } }
  };
  width = 550;
  height = 400;





  constructor(private service: DepartementService, private route: ActivatedRoute) {


  }




  ngOnInit(): void {
    this.tableau = false;
    this.graph=false;
    this.getDep();
    this.getMeteo();
    this.choixDonnee = new FormGroup({
      numelem: new FormControl(this.numelem, [
        Validators.required, Validators.min(1)]),

    });

  }

  switchGraphTable(): void {
    if (this.tableau) {
      this.tableau = false;
      this.graph=true;
    }else{
      this.tableau=true;
      this.graph=false;
    }
  }

  getDep(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.departement = responsedto.body;
        }
      }
    );
  }

  getMeteo(): void {
    if (!this.parMois) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.service.getMeteoByDepartement(id, this.numelem, this.page, this.sortname).subscribe(
        responseDto => {
          if (!responseDto.error) {
            this.allmeteo = responseDto.body.content;
            this.graph = true;
            this.data = [];
            this.allmeteo.forEach(e => this.data.push([e.dateMeteo, e.radiation, e.rain, e.tempMin, e.tempMax]));
        

          }
          else { this.allmeteo = [] }
        }
      );
    } else {
      this.service.getMeteoByMonthAndDepartement(this.month).subscribe(
        responseDto => {
          if (!responseDto.error) {
            this.allmeteo = responseDto.body;
          }
          else { this.allmeteo = [] }
        }
      );
    }
  }

}
