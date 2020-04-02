import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service';
import { UtilisateurUpdateDto} from 'src/app/models/utilisateur-update-dto';
import { identifierModuleUrl } from '@angular/compiler';

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
          this.allJardins = responseDto.body;
        }
        else { this.allJardins = [] }
      }
    );
  }

  delete(identifier: number) {
    this.service.delete(identifier).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allJardins = this.allJardins.filter(
            element => element.identifier !== identifier
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
