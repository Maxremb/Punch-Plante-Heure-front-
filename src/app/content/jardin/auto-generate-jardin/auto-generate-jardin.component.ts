import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';

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
      "largeurChemin" : new FormControl(this.jardin.chemin[1]),
      "largeurPlanche" : new FormControl(this.jardin.length),
    })
  }

  get length() { return this.dimensionsJardinForm.get('length') }
  get width() { return this.dimensionsJardinForm.get('width') }
  get user() { return this.dimensionsJardinForm.get('user') }
  get largeurPlanche() {return this.cheminForm.get('largeurPlanche')}
  get largeurChemin() {return this.cheminForm.get('largeurChemin')}

  // Verifie longueur>largeur puis appel la validation des dimensions si tout est ok
  verificationLongLarge() {
    this.messageErreur = null;
    if (this.jardin.length < this.jardin.width) {
      this.messageErreur = "La longueur doit être superieur à la largeur.";
    } else {
      this.genererMatrice();
    }
  }

  // Faire un espace aux bonnes proportions
  genererMatrice() {
    var nbLigne = this.jardin.width / 5; // on sépare notre espace par tranche de 5cm
    var nbCol = this.jardin.length / 5;

    for (let indexLigne = 0; indexLigne < nbLigne; indexLigne++) {
      this.matrice[indexLigne] = [];
      for (let indexCol = 0; indexCol < nbCol; indexCol++) {
        this.matrice[indexLigne][indexCol] = "";
      }
    }

  }

  // Délimitations des parcelles
  placerLesChemins(): void {
    // Calculer l'espace restant avec chemins horizontaux et verticaux pour le minimiser
    var largeurChemin = this.jardin.chemin[1];
    var largeurPlanche = this.jardin.chemin[1];

  
    return
  }

  // Qui va où ?
  organisationDesPlantes(listePlantes: Array<PlanteUtilisateurCreateDto>): void {

  }
}
