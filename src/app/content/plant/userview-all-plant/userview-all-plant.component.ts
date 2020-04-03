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
  pageActive:number =1;
  pageTotal:number[];

  constructor(private service:PlanteModeleService) { }

  ngOnInit(): void {
    this.getAll(1);
  }

  range(end) {
    return (new Array(end)).fill(undefined).map((_, i) => i);
  }

  getAll(npage: number) {
    this.service.getAll(npage).subscribe(
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
