import { Component, OnInit } from '@angular/core';
import { DepartementDto } from 'src/app/models/departement-dto';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { ActivatedRoute } from '@angular/router';
import { MeteoUpdateDto } from 'src/app/models/meteo-update-dto';
import { Router } from '@angular/router';

declare function maFonction(): any;

@Component({
  selector: 'app-detailed-departement',
  templateUrl: './detailed-departement.component.html',
  styleUrls: ['./detailed-departement.component.css']
})
export class DetailedDepartementComponent implements OnInit {

  depUpdateForm: FormGroup;
  departement: DepartementDto = new DepartementDto();
  messageValidation = '';
  messageValidation2 = '';
  error: boolean;
  choix: boolean;
  name: string;
  depNum: number;

  constructor(private service: DepartementService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Réupérer les UrlParam
    //serach name if not exist search id
    this.getDepById();
    maFonction();
    this.depUpdateForm = new FormGroup({
      //depNum: new FormControl(this.departement.depNum, Validators.required),
      name: new FormControl(this.departement.name, Validators.required),
    });
  }


  getDepById(): void {

    const id = +this.route.snapshot.paramMap.get('depNum');
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
        
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! Le departement a bien été modifié.';
          this.error = false;
        }
      },
      (error) => {
        
        this.messageValidation = 'ERREUR ! Le departement n\'a pas été modifié.';
        this.error = true;
      }

    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        
        if (!responseDto.error) {
          this.messageValidation2 = 'BRAVO ! Le departement a bien été supprimé.'
        }
      }
    );
  }

}
