import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';
import {JardinService} from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto} from 'src/app/models/utilisateur-update-dto';


@Component({
  selector: 'app-create-jardin',
  templateUrl: './create-jardin.component.html',
  styleUrls: ['./create-jardin.component.css']
})

export class CreateJardinComponent implements OnInit {

  addJardinForm: FormGroup;
  jardin = new JardinCreateDto;
  messageValidation = null;
  messageErreur = null;
  utilisateurActif = new UtilisateurUpdateDto;

  constructor(private service : JardinService) { }

  ngOnInit(): void {
    // Affecter l'user actif au jardin
    //this.utilisateurActif = this.service.utilisateurActif
    this.addJardinForm = new FormGroup({
      "nom": new FormControl(this.jardin.nom, Validators.required),
      "sol": new FormControl(this.jardin.sol, Validators.required),
      "longueur": new FormControl(this.jardin.longueur),
      "largeur": new FormControl(this.jardin.largeur),
      "departement": new FormControl(this.jardin.departement, Validators.required),
      "utilisateur" : new FormControl(this.jardin.utilisateur = this.utilisateurActif, Validators.required),
    })
  }

  get nom() { return this.addJardinForm.get('nom') }
  get sol() { return this.addJardinForm.get('sol') }
  get longueur() { return this.addJardinForm.get('longueur') }
  get largeur() { return this.addJardinForm.get('largeur') }
  get departement() {return this.addJardinForm.get('departement')}
  get utilisateur() {return this.addJardinForm.get('utilisateur')}

  create() {
    this.service.create(this.jardin).subscribe(
     responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
        } else { this.messageErreur = responseDto.message; }
       }
    )
  }
}
