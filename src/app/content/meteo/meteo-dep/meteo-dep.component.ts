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
  data1: string;
  data2: string;
  data3: string;
  data4: string;
  data5: string;

  title = 'meteo';
  type = 'ComboChart';
  data = [
    [this.data1, 5, 2, 3, 6],
    [this.data2, 10, 15, 20, 2],
    [this.data3, 6, 7, 8, 9],
    [this.data4, 5, 7, 9, 11],
    [this.data5, 3, 4, 6, 7]
  ];
  columnNames = ['date', 'ensoleillement', 'precipitation', 'Temperature min', 'Temperature max'];
  options = {
    hAxis: {
      title: 'Person'
    },
    vAxis: {
      title: 'Fruits'
    },
    seriesType: 'bars',
    series: { 3: { type: 'line' } }
  };
  width = 550;
  height = 400;



  constructor(private service: DepartementService, private route: ActivatedRoute) { }




  ngOnInit(): void {
    this.tableau = false;
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
            this.data1 = this.allmeteo[0].dateMeteo;
            this.data2 = this.allmeteo[1].dateMeteo;
            this.data3 =this.allmeteo[3].dateMeteo;
            this.data4=this.allmeteo[4].dateMeteo;
            this.data5 = this.allmeteo[5].dateMeteo;
            console.log(this.data1);
            
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
