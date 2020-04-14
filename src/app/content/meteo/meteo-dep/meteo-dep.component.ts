import { Component, OnInit } from '@angular/core';
import { DepartementDto } from 'src/app/models/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';
import { MeteoUpdateDto } from 'src/app/models/meteo-update-dto';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MeteoService } from 'src/app/services/meteo.service';

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
  choixDonneeMois: FormGroup;
  parMois: boolean = false;
  month: number = 4;
  year: number = 2020;
  date: Date;
  tableau: boolean;
  graph: boolean;



  data1: any;
  title1 = 'Températures';
  type1 = 'ComboChart';
  columnNames1 = ['date', 'Temperature min', 'Temperature max'];
  options1 = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Temperature'
    },
    seriesType: 'lines',

  };
  width1 = 1000;
  height1 = 400;

  data2: any;
  title2 = 'Ensoleillement';
  type2 = 'ComboChart';
  columnNames2 = ['date', 'ensoleillement (min)'];
  options2 = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Ensoleillement (min)'
    },
    seriesType: 'bars',

  };
  width2 = 1000;
  height2 = 400;

  data3: any;
  title3 = 'Précipitations';
  type3 = 'ComboChart';
  columnNames3 = ['date', 'precipitation'];
  options3 = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Précipitation (mm)'
    },
    seriesType: 'bars',

  };
  width3 = 1000;
  height3 = 400;





  constructor(private service: DepartementService, private route: ActivatedRoute, private serviceMeteo: MeteoService) {


  }




  ngOnInit(): void {
    this.tableau = false;
    this.graph = false;
    this.parMois = false;
    this.getDep();
    this.getMeteo();
    this.choixDonnee = new FormGroup({
      numelem: new FormControl(this.numelem, [
        Validators.required, Validators.min(1)]),
    });
    this.choixDonneeMois = new FormGroup({
      date: new FormControl(this.date, [
        Validators.required, Validators.min(1)]),
    });

  }

  switchGraphTable(): void {
    if (this.tableau) {
      this.tableau = false;
      this.graph = true;
    } else {
      this.tableau = true;
      this.graph = false;
    }
  }

  switchToMonth(): void {
    if (this.parMois) {
      this.parMois = false;
      this.getMeteo();
    } else {
      this.month = Number.parseInt(this.date.toString().split("-")[1]);
      this.year = Number.parseInt(this.date.toString().split("-")[0]);
      this.parMois = true;
      this.getMeteo();
    }
  }

  getDep(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.departement = responsedto.body;
          this.getMeteo();
        }
      }
    );
  }

  getMeteo(): void {

    const idDep = +this.route.snapshot.paramMap.get('id');
    if (!this.parMois) {

      this.service.getMeteoByDepartement(idDep, this.numelem, this.page, this.sortname).subscribe(
        responseDto => {
          if (!responseDto.error) {
            this.allmeteo = responseDto.body.content;
            if (this.allmeteo != []) {
              this.graph = true;
              this.data1 = [];
              this.data2 = [];
              this.data3 = [];
              this.allmeteo.forEach(e => this.data1.push([e.dateMeteo, e.tempMin, e.tempMax]));
              this.allmeteo.forEach(e => this.data2.push([e.dateMeteo, e.radiation]));
              this.allmeteo.forEach(e => this.data3.push([e.dateMeteo, e.rain]));

            }else { this.allmeteo = []; this.graph = false; }



          }
          else {
          this.allmeteo = [];
            this.graph = false;
          }
        }
      );
    }
    else {
      this.serviceMeteo.getMeteoByMonthAndDepartement(this.month, this.year, idDep).subscribe(
        responseDto => {
          if (!responseDto.error) {
            this.allmeteo = responseDto.body;
            if (this.allmeteo != []) {
              this.data1 = [];
              this.data2 = [];
              this.data3 = [];
              this.allmeteo.forEach(e => this.data1.push([e.dateMeteo, e.tempMin, e.tempMax]));
              this.allmeteo.forEach(e => this.data2.push([e.dateMeteo, e.radiation]));
              this.allmeteo.forEach(e => this.data3.push([e.dateMeteo, e.rain]));
            }else { this.allmeteo = []; this.graph = false; }
          }
          else { this.allmeteo = []; this.graph = false; }
        }
      );
    }
  }

}
