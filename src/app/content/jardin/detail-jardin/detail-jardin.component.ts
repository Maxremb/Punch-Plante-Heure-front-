import { Component, OnInit, ViewChild } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-detail-jardin',
  templateUrl: './detail-jardin.component.html',
  styleUrls: ['./detail-jardin.component.css']
})
export class DetailJardinComponent implements OnInit {

  jardin = new JardinUpdateDto();
  plantesParJardin = new Array<PlanteUtilisateurUpdateDto>();
  plantesFiltre = new Array<PlanteUtilisateurUpdateDto>();
  emptyliste: boolean = false;
  nombre: number;
  messageValidation: string;
  messageEchec: string;

  pageActive: number = 0;
  pageMax: number = 0;
  pageTotal: number[];
  idJardin: number;

  constructor(
    private jardinservice: JardinService,
    private planteutilisateurservice: PlanteUtilisateurService,
    private route: ActivatedRoute,
  ) { }


  // Valeurs a initialiser
  ngOnInit(): void {
    this.idJardin = +this.route.snapshot.paramMap.get('id');
    // recuperation de la variable jardin "stockée"

    this.getJardin();

    // recuperation des plantes utilisateurs dans ce jardin
    this.getPlantesParJardin(0);

  }

  getJardin() {
    this.jardinservice.getId(this.idJardin).subscribe((resp) => {
      this.jardin = resp.body;
    });
  }

  // recuperation des plantes utilisateurs dans ce jardin
  getPlantesParJardin(nPage: number): void {
    this.planteutilisateurservice.getAllByJardinListe(this.idJardin).subscribe(
      (responseDto) => {
        this.plantesParJardin = responseDto.body;
        this.plantesFiltre = this.plantesParJardin.filter(plante =>( plante.modelPlant.commun !="Obstacle" &&  plante.modelPlant.commun!="Chemin"))
       


      }
    );
  }

  // suppression de la plante utilisateur numero ... + rechargement de la page
  supprimer(id: number): void {
    this.planteutilisateurservice.delete(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesParJardin = this.plantesParJardin.filter(element => element.identifiant !== id);
          this.plantesFiltre = this.plantesFiltre.filter(element => element.identifiant !== id);

        }
      }
    );
  }

  // enregistrement de la planteutilisateur a modifier dans la variable planteUtilisateur
  stockagePlanteUtilisateur(planteUtilisateur: PlanteUtilisateurUpdateDto) {
    this.planteutilisateurservice.planteUtilisateur = planteUtilisateur;
  }

  range(end) {
    return (new Array(end)).fill(undefined).map((_, i) => i);
  }

}
