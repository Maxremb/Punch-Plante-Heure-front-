import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';
import { PlanteUtilisateurUpdateDto } from 'src/app/models/plante-utilisateur-update-dto';

@Component({
  selector: 'app-auto-generate-jardin',
  templateUrl: './auto-generate-jardin.component.html',
  styleUrls: ['./auto-generate-jardin.component.css']
})
export class AutoGenerateJardinComponent implements OnInit {

  jardin = new JardinCreateDto;
  dimensionsJardinForm; cheminForm: FormGroup;
  messageValidation = null;
  messageErreur = null;
  utilisateurActif = new UtilisateurUpdateDto;
  listePlantes = null;
  matrice: Array<Array<String>> //matrice bidimensionnelle représentant l'emplacement des plantes


  constructor(private service: JardinService) { }

  ngOnInit(): void {
    this.dimensionsJardinForm = new FormGroup({
      "length": new FormControl(this.jardin.length),
      "width": new FormControl(this.jardin.width),
      "user": new FormControl(this.jardin.user = this.utilisateurActif, Validators.required),
    })
    this.cheminForm = new FormGroup({
      "largeurChemin": new FormControl(this.jardin.chemin[1]),
      "largeurPlanche": new FormControl(this.jardin.length),
    })
  }

  get length() { return this.dimensionsJardinForm.get('length') }
  get width() { return this.dimensionsJardinForm.get('width') }
  get user() { return this.dimensionsJardinForm.get('user') }
  get largeurPlanche() { return this.cheminForm.get('largeurPlanche') }
  get largeurChemin() { return this.cheminForm.get('largeurChemin') }

  // Délimitations des parcelles
  placerLesChemins(): void {
    // Calculer l'espace restant avec chemins horizontaux et verticaux pour le minimiser
    var largeurChemin = this.jardin.chemin[1];
    var largeurPlanche = this.jardin.chemin[1];


    return
  }


  //La matrice récupérée a déjà les plantes avec les coordonnées déjà placées 
  autogenerate(listePlantesCreate: Array<PlanteUtilisateurCreateDto>, matrice, listePlantesUpdate: Array<PlanteUtilisateurUpdateDto>) {
    let created = listePlantesCreate.filter(p => p.coordonnees != null);
    let updated = listePlantesUpdate.filter(p => p.coordonnees != null);
    let fini = false;

    // Tantque la matrice a de la place, on essaie de placer des plantes
    for (let index = 0; index < matrice.length; index++) {
      if (this.arrayRempli(matrice[index])) {
        for (let index2 = 0; index2 < matrice[index].length; index2++) {
          if (matrice[index][index2] == "") {
            if (updated.length > 0) {
              let p = updated.shift() //on retire le premier élement de la liste et on mappe la plante et la matrice
              matrice[index][index2] = p.modelPlant.commun;
              p.coordonnees[0] = index2;
              p.coordonnees[1] = index;
            } else if (created.length > 0) {
              let p = created.shift() //on retire le premier élement de la liste et on mappe la plante et la matrice
              matrice[index][index2] = p.modelPlant.commun;
              p.coordonnees[0] = index2;
              p.coordonnees[1] = index;
            } else {
              fini = true;
              break;
            }
          }
        }
        if(fini){
          break;
        }
      }
    }


  }

  //Permet de tester si il y a au moins un emplacement vide dans la matrice
  arrayRempli(matrice): boolean {
    var result = true;
    for (let index = 0; index < matrice.length; index++) {
      if (matrice[index] == "") {
        result = false;
        break;
      }
    }
    return result;
  }
}
