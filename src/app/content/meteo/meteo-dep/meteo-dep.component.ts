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
  width1 = 550;
  height1 = 400;

  data2: any;
  title2 = 'Ensoleillement';
  type2 = 'ComboChart';
  columnNames2 = ['date', 'ensoleillement'];
  options2 = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Temperature'
    },
    seriesType: 'bars',
   
  };
  width2 = 550;
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
      title: 'Temperature'
    },
    seriesType: 'bars',
    
  };
  width3 = 550;
  height3 = 400;





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

  // switchToMonth(): void {
  //   if(this.parMois) {

  //   }else {
  //     this.parMois=true;
  //     this.getMeteo(moisenCours);
  //   }
  // }

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
          if(this.allmeteo!= []){
            this.graph = true;
            this.data1 = [];
            this.data2 = [];
            this.data3 = [];
            this.allmeteo.forEach(e => this.data1.push([e.dateMeteo, e.tempMin, e.tempMax]));
            this.allmeteo.forEach( e => this.data2.push([e.dateMeteo, e.radiation]));
            this.allmeteo.forEach( e => this.data3.push([e.dateMeteo, e.rain]) );
            
          }
            
        

          }
          else { this.allmeteo = [] }
        }
      );}
    //  else {
    //   this.service.getMeteoByMonthAndDepartement(this.month).subscribe(
    //     responseDto => {
    //       if (!responseDto.error) {
    //         this.allmeteo = responseDto.body;
    //       }
    //       else { this.allmeteo = [] }
    //     }
    //   );
    // }
  }

}
