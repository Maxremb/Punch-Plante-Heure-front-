import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';

@Component({
  selector: 'app-detail-jardin',
  templateUrl: './detail-jardin.component.html',
  styleUrls: ['./detail-jardin.component.css']
})
export class DetailJardinComponent implements OnInit {

  jardin: JardinUpdateDto;
  plantesParJardin = new Array<PlanteUtilisateurUpdateDto>();
  allPlantes = new Array<PlanteModeleUpdateDto>();
  emptyliste: boolean = false;
  modification: boolean = false;
  ajout: boolean = false;
  nombre: number;
  planteForm: FormGroup;
  message: string;
  
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private jardinservice: JardinService,
    private planteutilisateurservice: PlanteUtilisateurService,
    private plantemodeleservice: PlanteModeleService  
    ) { }

  ngOnInit(): void {
    this.getJardin();
    this.getPlantesParJardin();
    this.getAllPlantes();
    
  }

  getJardin(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.jardinservice.getId(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.jardin = responseDto.object;
        }
      }
     );
  }
 
  getPlantesParJardin(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planteutilisateurservice.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesParJardin = responseDto.object;
          if (this.plantesParJardin.length==0) {
            this.emptyliste = true;
          }
          else {
            this.emptyliste = false;
            this.nombre = this.plantesParJardin.length;
          }
        }
      }
    );
  }

  getAllPlantes(): void {
    this.plantemodeleservice.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allPlantes = responseDto.object;
        }
      }
    )
  }

  afficherModification(): void {
    this.modification = true;
  }

  

  goBack(): void {
    this.location.back();
  }

  supprimer(id: number): void {
    this.planteutilisateurservice.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.plantesParJardin = this.plantesParJardin.filter(element =>  element.id !== id);
          this.message = 'Suppression reussie';
          document.location.reload();
        }
      }
    );
  }

  update(): void {
    this.service.update(this.classe).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageValidation = 'Mise à jour reussie';
          document.location.reload();
        }
      },
      (responseDtoError) => {
        if (responseDtoError.error) {
          this.messageEchec = 'Erreur de mise à jour';
          document.location.reload();
        }
      }
    );
  }

}
