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
      "length": new FormControl(this.jardin.length),
      "width": new FormControl(this.jardin.width),
      "utilisateur" : new FormControl(this.jardin.user = this.utilisateurActif, Validators.required),
    })
  }

  get length() { return this.dimensionsJardinForm.get('longueur') }
  get width() { return this.dimensionsJardinForm.get('width') }
  get user() {return this.dimensionsJardinForm.get('user')}

  validerDimensions() {
    
  }
}
