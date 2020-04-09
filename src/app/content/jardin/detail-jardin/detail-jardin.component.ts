import { Component, OnInit, ViewChild } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteUtilisateurService } from 'src/app/services/plante-utilisateur-service.service';
import { DepartementDto } from 'src/app/models/departement-dto';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-detail-jardin',
  templateUrl: './detail-jardin.component.html',
  styleUrls: ['./detail-jardin.component.css']
})
export class DetailJardinComponent implements OnInit {

  jardin: JardinUpdateDto;
  plantesParJardin = new Array<PlanteUtilisateurUpdateDto>();
  emptyliste: boolean = false;
  nombre: number;
  messageValidation: string;
  messageEchec: string;

  pageActive: number = 0;
  pageMax: number = 0;
  pageTotal: number[];

  constructor(
    private jardinservice: JardinService,
    private planteutilisateurservice: PlanteUtilisateurService,
    private route: ActivatedRoute,
  ) { }


  // Valeurs a initialiser
  ngOnInit(): void {
    // recuperation de la variable jardin "stockée"
    // this.jardin = this.jardinservice.getId().subscribe.();
    this.getJardin();
    // this.jardin = new JardinUpdateDto();
    // this.jardin.identifier = 1;
    // this.jardin.length = 1;
    // this.jardin.width = 1;
    // this.jardin.name = 'JardinTest';
    // this.jardin.dept = new DepartementDto();

    // recuperation des plantes utilisateurs dans ce jardin
    this.getPlantesParJardin(0);
    console.log('DEBUG DETAIL JARDIN LISTE PLANTE' + this.plantesParJardin)

  }

  getJardin() {
    const idJardin = +this.route.snapshot.paramMap.get('id');
    this.jardinservice.getId(idJardin).subscribe((resp) => {
      this.jardin = resp.body;
    });
    console.log('DEBUG JARDIN DETAIL', this.jardin)
  }

  // recuperation des plantes utilisateurs dans ce jardin
  getPlantesParJardin(nPage: number): void {
    this.planteutilisateurservice.getAllByJardin(this.jardin.identifier, nPage).subscribe(
      (responseDto) => {
        console.log('debug responseDto from server : ', responseDto)
        this.plantesParJardin = responseDto.body.content;
        this.pageActive = responseDto.body.number;
        this.pageTotal = this.range(responseDto.body.totalPages);
        this.pageMax = responseDto.body.totalPages;


      }
    );
    console.log('DEBUG plantesParJardin' + this.plantesParJardin[0]);
    console.log('DEBUG LENGTH LISTE ' + this.plantesParJardin.length);
  }

  // suppression de la plante utilisateur numero ... + rechargement de la page
  supprimer(id: number): void {
    this.planteutilisateurservice.delete(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.plantesParJardin = this.plantesParJardin.filter(element => element.identifiant !== id);

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
