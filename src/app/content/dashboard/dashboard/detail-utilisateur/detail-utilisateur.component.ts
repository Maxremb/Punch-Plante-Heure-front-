import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { ActivatedRoute, Router } from '@angular/router';

declare function maFonction(): any;

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.css']
})
export class DetailUtilisateurComponent implements OnInit {

  userUpdateForm: FormGroup;

  utilisateur: UtilisateurUpdateDto = new UtilisateurUpdateDto();

  messageValidation = '';
  error: boolean;
  
  constructor(/*private service: UtilisateurService,*/ private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //this.getUserById();
    maFonction();
    this.userUpdateForm = new FormGroup({
      //depNum: new FormControl(this.departement.depNum, Validators.required),
      firstName: new FormControl(this.utilisateur.firstName, Validators.required),
      lastName: new FormControl(this.utilisateur.lastName, Validators.required),
      pseudo: new FormControl(this.utilisateur.pseudo, Validators.required),
      mail: new FormControl(this.utilisateur.mail, Validators.required),
      phone: new FormControl(this.utilisateur.phone, Validators.required),
      picture: new FormControl(this.utilisateur.picture),
    });
  }


  /*getUserById(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(
      (responsedto) => {
        if (!responsedto.error) {
          this.utilisateur = responsedto.body;
        }
      }
    );
  }


  update() {
    this.service.update(this.utilisateur).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! Le departement a bien été modifié.';
          this.error = false;
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! Le departement n\'a pas été modifié.';
        this.error = true;
      }

    );
  }*/


}
