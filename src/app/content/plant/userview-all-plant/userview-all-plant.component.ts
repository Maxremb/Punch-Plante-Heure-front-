import { Component, OnInit } from '@angular/core';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';

@Component({
  selector: 'app-userview-all-plant',
  templateUrl: './userview-all-plant.component.html',
  styleUrls: ['./userview-all-plant.component.css']
})
export class UserviewAllPlantComponent implements OnInit {

  allPlant = new Array<PlanteModeleUpdateDto>();
  pageActive:number =0;
  maxPage:number=0;
  pageTotal:number[]=[];
  keyWord: string;

  constructor(private service:PlanteModeleService) { }

  ngOnInit(): void {
    this.getAll(0);
  }

  range(pactif,ptotal) {
    if(ptotal>5){
      if(pactif<3) return (new Array(5)).fill(undefined).map((_, i) => i);
      else if(pactif>2 && pactif<ptotal-2) return (new Array(5)).fill(undefined).map((_, i) => i+pactif-2);
      else return (new Array(5)).fill(undefined).map((_, i) => i+ptotal-5);
    }else{
      return (new Array(ptotal)).fill(undefined).map((_, i) => i);
    }
  }

  getAll(npage: number) {
    this.service.getAll(npage).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allPlant = responseDto.body.content;
          this.pageActive = responseDto.body.number;
          this.maxPage = responseDto.body.totalPages;
          this.pageTotal = this.range(this.pageActive,this.maxPage);
        }
      }
    );
  }

}
