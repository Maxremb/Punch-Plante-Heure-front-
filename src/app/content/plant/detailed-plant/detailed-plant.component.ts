import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ActivatedRoute } from '@angular/router';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';

declare function maFonction():any;

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
    maFonction();
    this.plantUpdateForm = new FormGroup({
      commun: new FormControl(this.plant.commun,Validators.required),
      scientifique: new FormControl(this.plant.scientifique,Validators.required),
      arrosage: new FormControl(this.plant.arrosage,Validators.required),
      ensoleillement: new FormControl(this.plant.ensoleillement,Validators.required),
      humidite: new FormControl(this.plant.humidite,Validators.required),
      sol: new FormControl(this.plant.sol,Validators.required),
      repiquage: new FormControl(this.plant.repiquage,Validators.required),
      min: new FormControl(this.plant.min,Validators.required),
      max: new FormControl(this.plant.max,Validators.required),
      desc: new FormControl(this.plant.desc,Validators.required),
      toxi: new FormControl(this.plant.toxi,Validators.required),
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
