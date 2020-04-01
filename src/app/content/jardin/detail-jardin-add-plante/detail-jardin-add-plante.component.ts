import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-jardin-add-plante',
  templateUrl: './detail-jardin-add-plante.component.html',
  styleUrls: ['./detail-jardin-add-plante.component.css']
})
export class DetailJardinAddPlanteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  afficherAjout(): void {
    this.ajout = true;
    this.planteForm = this.formBuilder.group({
      nomCommun: ['', Validators.required],  
      datePlantation: ['', Validators.required],
      dateSemi: ['', Validators.required],
      etatPlante: ['', Validators.required],
      etatSante: ['', Validators.required],
      });
  }
}
