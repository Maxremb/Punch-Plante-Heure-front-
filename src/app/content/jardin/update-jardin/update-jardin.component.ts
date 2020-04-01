import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';

@Component({
  selector: 'app-update-jardin',
  templateUrl: './update-jardin.component.html',
  styleUrls: ['./update-jardin.component.css']
})
export class UpdateJardinComponent implements OnInit {

  updateJardinForm: FormGroup;
  jardin: JardinUpdateDto;
  utilisateurActif = new UtilisateurUpdateDto;
  messageValidation = null;
  messageErreur = null;

  constructor(private service: JardinService) { }

  ngOnInit(): void {
    this.jardin = this.service.jardin;
    // Affecter l'user actif au jardin
    //this.utilisateurActif = this.service.utilisateurActif
    this.updateJardinForm = new FormGroup({
      'nom': new FormControl(this.jardin.nom),
      'sol': new FormControl(this.jardin.sol),
      'longueur': new FormControl(this.jardin.longueur),
      'largeur': new FormControl(this.jardin.largeur),
      'departement': new FormControl(this.jardin.departement),
      'utilisateur': new FormControl(this.jardin.utilisateur),
    })
  }

  get nom() { return this.updateJardinForm.get('nom') }
  get sol() { return this.updateJardinForm.get('sol') }
  get longueur() { return this.updateJardinForm.get('longueur') }
  get largeur() { return this.updateJardinForm.get('largeur') }
  get departement() { return this.updateJardinForm.get('departement') }
  get utilisateur() { return this.updateJardinForm.get('utilisateur') }

  update() {
    this.service.update(this.jardin).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
        } else { this.messageErreur = responseDto.message; }
      }
    );
  }

}
