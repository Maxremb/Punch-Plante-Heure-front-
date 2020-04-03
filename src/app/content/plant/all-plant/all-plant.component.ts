import { Component, OnInit } from '@angular/core';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-all-plant',
  templateUrl: './all-plant.component.html',
  styleUrls: ['./all-plant.component.css']
})
export class AllPlantComponent implements OnInit {

  allPlant = new Array<PlanteModeleUpdateDto>();
  pageActive:number =1;
  pageTotal:number[];

  constructor(private service:PlanteModeleService) { }

  ngOnInit(): void {
    this.getAll(1);
  }
  range(end) {
    return (new Array(end)).fill(undefined).map((_, i) => i);
  }

  getAll(nbpage: number) {
    this.service.getAll(nbpage).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allPlant = responseDto.body.content;
          this.pageActive = responseDto.body.number;
          this.pageTotal = this.range(responseDto.body.totalPages);
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allPlant = this.allPlant.filter(
            element =>  element.identifiant !== id
          );
        }
        this.getAll(this.pageActive);
      }
    );
  }

  getId(id: number) {
    this.service.getId(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allPlant = this.allPlant.filter(
            element =>  element.identifiant == id
          );
        }
      }
    );
  }


}
