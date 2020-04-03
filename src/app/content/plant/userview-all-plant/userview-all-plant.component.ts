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

  constructor(private service:PlanteModeleService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allPlant = responseDto.body;
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
