import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JardinCreateDto } from 'src/app/models/jardin-create-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';

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

  constructor(private service : JardinService) { }

  ngOnInit(): void {
    this.dimensionsJardinForm = new FormGroup({
      "longueur": new FormControl(this.jardin.longueur),
      "largeur": new FormControl(this.jardin.largeur),
      "utilisateur" : new FormControl(this.jardin.utilisateur = this.utilisateurActif, Validators.required),
    })
  }

  get longueur() { return this.dimensionsJardinForm.get('longueur') }
  get largeur() { return this.dimensionsJardinForm.get('largeur') }
  get utilisateur() {return this.dimensionsJardinForm.get('utilisateur')}

  validerDimensions() {
    
  }
}
