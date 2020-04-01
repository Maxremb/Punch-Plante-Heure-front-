import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto} from 'src/app/models/utilisateur-update-dto';

@Component({
  selector: 'app-all-jardin',
  templateUrl: './all-jardin.component.html',
  styleUrls: ['./all-jardin.component.css']
})
export class AllJardinComponent implements OnInit {

  allJardins = new Array<JardinUpdateDto>();
  jardin = new JardinUpdateDto;
  utilisateurActif = new UtilisateurUpdateDto;

  constructor(private service : JardinService) { }

  ngOnInit(): void {
    this.readAllByIdUtilisateur();
  }

  readAllByIdUtilisateur() {
    this.service.getAllByUtilisateur(this.utilisateurActif.id).subscribe(
     responseDto => {
        if (!responseDto.error) {
          this.allJardins = responseDto.object;
        }
        else { this.allJardins = [] }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allJardins = this.allJardins.filter(
            element => element.id !== id
          );
          this.jardin = null;
        }
      }
    )
  }

  stockageJardin(jardinTransfert : JardinUpdateDto) {
    this.service.jardin = jardinTransfert ;
  }


}
