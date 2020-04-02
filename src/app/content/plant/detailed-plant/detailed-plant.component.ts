import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ActivatedRoute } from '@angular/router';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

@Component({
  selector: 'app-detailed-plant',
  templateUrl: './detailed-plant.component.html',
  styleUrls: ['./detailed-plant.component.css']
})
export class DetailedPlantComponent implements OnInit {
  plantUpdateForm:FormGroup;
  @Input() plant: PlanteModeleUpdateDto;
  messageValidation = '';
  error:boolean;

  constructor(private service: PlanteModeleService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.plantUpdateForm = new FormGroup({
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
  getPlant(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getId(id)
      .subscribe(responsedto => this.plant = responsedto.body);
  }

  save() {
    this.service.update(this.plant).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! L\'examen a bien été modifié.';
          this.error = false;
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! L\'examen n\'a pas été modifié.';
        this.error = true;
        }

    );
  }

}
