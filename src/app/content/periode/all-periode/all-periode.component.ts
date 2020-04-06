import { Component, OnInit } from '@angular/core';
import { PeriodeService } from 'src/app/services/periode.service';
import { PeriodeUpdateDto } from 'src/app/models/periode-update-dto';

@Component({
  selector: 'app-all-periode',
  templateUrl: './all-periode.component.html',
  styleUrls: ['./all-periode.component.css']
})
export class AllPeriodeComponent implements OnInit {

  allPeriodes = new Array<PeriodeUpdateDto>();
  periode = new PeriodeUpdateDto;

  constructor(private service : PeriodeService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPeriodes = responseDto.body;
        }
        else { this.allPeriodes = [] }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allPeriodes = this.allPeriodes.filter(
            element => element.id !== id
          );
        }
      }
    )
  }

  // permet d'envoyer la periode vers la page update à travers le service
  stockagePeriode(period : PeriodeUpdateDto) {
  this.service.periode = period ;
  }
}
