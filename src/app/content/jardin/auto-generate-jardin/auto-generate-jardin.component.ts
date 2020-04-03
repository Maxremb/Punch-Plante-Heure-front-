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
  dimensionsJardinForm: FormGroup;
  messageValidation = null;
  messageErreur = null;
  utilisateurActif = new UtilisateurUpdateDto;
  listePlantes = null;

  constructor(private service : JardinService) { }

  ngOnInit(): void {
    this.dimensionsJardinForm = new FormGroup({
      "length": new FormControl(this.jardin.length),
      "width": new FormControl(this.jardin.width),
      "user" : new FormControl(this.jardin.user = this.utilisateurActif, Validators.required),
    })
  }

  get length() { return this.dimensionsJardinForm.get('length') }
  get width() { return this.dimensionsJardinForm.get('width') }
  get user() {return this.dimensionsJardinForm.get('user')}

  // Verifie longueur>largeur puis appel la validation des dimensions si tout est ok
  verificationLongLarge() {
    this.messageErreur = null;
    if (this.jardin.length < this.jardin.width) {
      this.messageErreur = "La longueur doit être superieur à la largeur.";
    } else {
      this.validerDimensions();
    }
  }

  // Faire un espace aux bonnes proportions
  validerDimensions() {
    
  }

  // Délimitations des parcelles
  placerLesChemins(): void {
    // Faire des divisons pour savoir quels est le découpage garentissant une surface de culture maximal
    // Tout en gardant des espaces pour circuler entre les parcelles
    return
  }

  // Qui va où ?
  organisationDesPlantes(listePlantes: Array<PlanteUtilisateurCreateDto>): void {

  }
}
