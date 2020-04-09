import { Component, OnInit } from '@angular/core';
import { UtilisateurUpdateDto } from 'src/app/models/utilisateur-update-dto';
import { JardinService } from 'src/app/services/jardin-service.service'
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  utilisateur: UtilisateurUpdateDto;
  allJardins = new Array<JardinUpdateDto>();

  constructor(private jardinservice: JardinService, ) { }

  ngOnInit(): void {
    this.getAllJardins();
  }

  getAllJardins() {
    this.jardinservice.getAllByUtilisateur(this.utilisateur.identifier, 0).subscribe(
      responseDto => {
          if (!responseDto.error) {
            this.allJardins = responseDto.body.content;
          }
        },
      responseDtoerror => {
          if (responseDtoerror.error) {
            this.allJardins = [];
          }
        
        }
    );
  }
}
