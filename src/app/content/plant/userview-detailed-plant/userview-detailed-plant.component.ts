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

    plant: PlanteModeleUpdateDto = new PlanteModeleUpdateDto();
    messageValidation = '';
    error: boolean;

    // injection des services necessaires
    constructor(
      private service: PlanteModeleService,
      private route: ActivatedRoute,
      ) { }
      
    // appel a la methode getPlant au demarrage
    ngOnInit(): void { 
      this.getPlant();
    }

    // affectation de la valeur plant grace a la methode getId ( id est present dans l'url )
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
