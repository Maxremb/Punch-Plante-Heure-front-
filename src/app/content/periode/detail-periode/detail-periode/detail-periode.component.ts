import { Component, OnInit } from '@angular/core';
import { PeriodeService } from 'src/app/services/periode.service';
import { PeriodeUpdateDto } from 'src/app/models/periode-update-dto';

@Component({
  selector: 'app-detail-periode',
  templateUrl: './detail-periode.component.html',
  styleUrls: ['./detail-periode.component.css']
})
export class DetailPeriodeComponent implements OnInit {

  constructor(private service : PeriodeService) { }

  periode = new PeriodeUpdateDto;

  ngOnInit(): void {
    this.periode = this.service.periode;
  }

}
