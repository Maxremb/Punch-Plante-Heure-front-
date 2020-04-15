import { Component, OnInit } from '@angular/core';
import { JardinService } from 'src/app/services/jardin-service.service';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';
import { ConnectedUser } from 'src/app/models/connectedUser';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  user: ConnectedUser;
  allJardins = new Array<JardinUpdateDto>();
  allJardinsBis = new Array<JardinUpdateDto>();

  constructor(
    private jardinservice: JardinService
    ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('connectedUser'));
    this.getAllJardins();
  }

  getAllJardins() {
    this.jardinservice.getAllByUtilisateur(this.user.id, 0).subscribe(
      responseDto => {
          if (!responseDto.error) {
            this.allJardins = responseDto.body.content;
            this.allJardinsBis = this.allJardins.filter(
              (item, i, arr) => arr.findIndex((t) => t.dept.depNum === item.dept.depNum) === i);
            
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
