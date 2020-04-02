import { Component, OnInit } from '@angular/core';
import { modelPlantService } from 'src/app/services/plante-modele-service.service';
import { modelPlantCreateDto } from 'src/app/models/plante-modele-create-dto';
import { modelPlantUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-all-plant',
  templateUrl: './all-plant.component.html',
  styleUrls: ['./all-plant.component.css']
})
export class AllPlantComponent implements OnInit {

  allPlant = new Array<modelPlantUpdateDto>();

  constructor(private service:modelPlantService) { }

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

  getId(id: number) {
    this.service.getId(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allPlant = this.allPlant.filter(
            element =>  element.id == id
          );
        }
      }
    );
  }


}
