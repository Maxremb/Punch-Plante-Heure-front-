import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { PlanteModeleCreateDto } from 'src/app/models/plante-modele-create-dto';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteUtilisateurCreateDto } from 'src/app/models/plante-utilisateur-create-dto';


@Component({
  selector: 'app-graphique-jardin',
  templateUrl: './graphique-jardin.component.html',
  styleUrls: ['./graphique-jardin.component.css']
})
export class GraphiqueJardinComponent implements OnInit {

  @Input() jardin: JardinUpdateDto;
  matrice = new Array<Array<String>>(); //matrice bidimensionnelle représentant l'emplacement des plantes
  selection : String =  "";
  plantes: Array<PlanteUtilisateurCreateDto>

  constructor(private service: JardinService) { 

    // entrée d'un jardin spécifique pour test au lieu de this.jardinservice.jardin
    this.jardin = new JardinUpdateDto();
    this.jardin.identifier =1;
    this.jardin.length = 1;
    this.jardin.width = 1;
    this.jardin.name = 'JardinTest';
    console.log('debug construct Graphique : ', this.jardin);
  }

  

  ngOnInit(): void {
    this.genererMatrice();
    this.plantes; //TO DO : recuperer la listes des plantes à placer
    this.genererCarte();
  }

  // Faire un espace aux bonnes proportions
  genererMatrice() {
    var nbLigne = this.jardin.width * 100 / 5; // on sépare notre espace par tranche de 5cm
    var nbCol = this.jardin.length * 100 / 5;

    for (let indexLigne = 0; indexLigne < nbLigne; indexLigne++) {
      this.matrice[indexLigne] = [];
      for (let indexCol = 0; indexCol < nbCol; indexCol++) {
        this.matrice[indexLigne][indexCol] = "";
      }
    }

    this.matrice[3][5]= "plante"
    this.matrice[0][5]= "plante"
    this.matrice[18][5]= "obstacle"
    this.matrice[3][9]= "plante"
    this.matrice[3][4]= "obstacle"
    this.matrice[7][10]= "plante"
    this.matrice[0][0]= "chemin"
    this.matrice[4][4]= "chemin"

  }

  modifOnClick(y:number, x: number) {
    console.log('DEBUG MODIF ON CLICK' + this.matrice[y][x]);
    this.matrice[y][x] = this.selection;

    console.log('DEBUG MATRICE ' + this.matrice);
  }

  modifSelection(objet : String){
    this.selection = objet;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  //Générer le canvas selon la matrice
  genererCarte() {
    var canvas = document.getElementById('carteJardin');
  //  var ctx = canvas.getContext('2d');
  }


}
