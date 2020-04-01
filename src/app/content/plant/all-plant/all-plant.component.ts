import { Component, OnInit } from '@angular/core';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-all-plant',
  templateUrl: './all-plant.component.html',
  styleUrls: ['./all-plant.component.css']
})
export class AllPlantComponent implements OnInit {

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
          this.allPlant = responseDto.object;
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
            element =>  element.id !== id
          );
        }
        this.getAll();
        console.log('result after delete: ', this.allPlant);
      }
    );
  }

  getOne(id: number) {
    this.service.getOne(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allPlant = this.allPlant.filter(
            element =>  element.id == id
          );
        }
        console.log('result after delete: ', this.allPlant);
      }
    );
  }


}
