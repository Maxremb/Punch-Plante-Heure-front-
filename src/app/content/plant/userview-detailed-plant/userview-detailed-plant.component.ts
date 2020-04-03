import { Component, OnInit } from '@angular/core';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ActivatedRoute } from '@angular/router';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-userview-detailed-plant',
  templateUrl: './userview-detailed-plant.component.html',
  styleUrls: ['./userview-detailed-plant.component.css']
})
export class UserviewDetailedPlantComponent implements OnInit {

    plant: PlanteModeleUpdateDto;
    messageValidation = '';
    error: boolean;
  
    constructor(
      private service: PlanteModeleService,
      private route: ActivatedRoute,
      private location: Location) { }
  
    ngOnInit(): void { 
      this.getPlant();
    }

    getPlant(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.service.getId(id).subscribe(
          (responseDto) => {
             if (!responseDto.error) {
                this.plant = responseDto.body;
               } 
          }
      );
    }
  }
