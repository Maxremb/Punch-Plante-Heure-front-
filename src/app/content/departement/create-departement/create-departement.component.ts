import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DepartementDto } from 'src/app/models/departement-dto';
import { DepartementService } from 'src/app/services/departement.service';

declare function maFonction():any;

@Component({
  selector: 'app-create-departement',
  templateUrl: './create-departement.component.html',
  styleUrls: ['./create-departement.component.css']
})
export class CreateDepartementComponent implements OnInit {


  dept = new DepartementDto();
  messageValidation = '';
  error:boolean;

  depCreateForm : FormGroup;

  
  constructor(private service: DepartementService) { }

  ngOnInit(): void {
    maFonction(); // on lance la fonction js pour pouvoir l'appeler et l'utiliser dans le fichier html
    console.log("init componenet ")
    this.depCreateForm = new FormGroup({
      depNum: new FormControl(this.dept.depNum, [
        Validators.required, Validators.min(1)]),
      name: new FormControl(this.dept.name, Validators.required),
    });
  }



  save() {
    console.log(this.dept);
    this.service.create(this.dept).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = 'BRAVO ! Le Departement a bien été ajoutée à la base de données';
          this.error = false;
          document.location.reload();
        }
      },
      (error) => {
        console.log('debug responseDto : ', error);
        this.messageValidation = 'ERREUR ! Le Departement n\'a pas été ajoutée à la base de données';
        this.error = true;
        }

    );
  }

}
