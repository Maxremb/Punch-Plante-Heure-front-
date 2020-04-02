import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';

@Component({
  selector: 'app-create-plant',
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.css']
})
export class CreatePlantComponent implements OnInit {
  plantCreateForm: FormGroup;

  plant = new PlanteModeleCreateDto();
  messageValidation = '';
  error:boolean;

  constructor(private service: PlanteModeleService) { }

  ngOnInit(): void {
    this.plantCreateForm = new FormGroup({
      nomCommun: new FormControl(this.plant.nomCommun,Validators.required),
      nomScientifique: new FormControl(this.plant.nomScientifique,Validators.required),
      intervalArrossage: new FormControl(this.plant.intervalArrossage,Validators.required),
      ensoleillementOpti: new FormControl(this.plant.ensoleillementOpti,Validators.required),
      humiditeOpti: new FormControl(this.plant.humiditeOpti,Validators.required),
      solOpti: new FormControl(this.plant.solOpti,Validators.required),
      repiquage: new FormControl(this.plant.repiquage,Validators.required),
      temperatureMin: new FormControl(this.plant.temperatureMin,Validators.required),
      temperatureMax: new FormControl(this.plant.temperatureMax,Validators.required),
      description: new FormControl(this.plant.description,Validators.required),
      toxicite: new FormControl(this.plant.toxicite,Validators.required),
    });
  }

  save() {
    this.service.create(this.plant).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! La plante a bien été ajouté à la DB';
          this.error = false;
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! La plante n\'a pas été ajouté à la DB';
        this.error = true;
        }

    );
  }

}
