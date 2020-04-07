import { Component, OnInit } from '@angular/core';
import { DepartementDto } from 'src/app/models/departement-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { ActivatedRoute } from '@angular/router';
import { MeteoUpdateDto } from 'src/app/models/meteo-update-dto';

declare function maFonction():any;

@Component({
  selector: 'app-detailed-departement',
  templateUrl: './detailed-departement.component.html',
  styleUrls: ['./detailed-departement.component.css']
})
export class DetailedDepartementComponent implements OnInit {

  depUpdateForm: FormGroup;
  departement: DepartementDto;
  messageValidation = '';
  error: boolean;
 
  constructor(private service: DepartementService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    maFonction();
    this.getDep();
    this.depUpdateForm = new FormGroup({
      commun: new FormControl(this.departement.depNum,Validators.required),
      scientifique: new FormControl(this.departement.name,Validators.required),
    });
  }

  getDep() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.departement = responsedto.body;
        }
      }
    );
  }

  update() {
    this.service.update(this.departement).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! Le departement a bien été modifié.';
          this.error = false;
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! Le departement n\'a pas été modifié.';
        this.error = true;
        }

    );
  }

}
