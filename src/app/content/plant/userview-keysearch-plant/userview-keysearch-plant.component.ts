import { Component, OnInit } from '@angular/core';
import { PlanteModeleUpdateDto } from 'src/app/models/plante-modele-update-dto';
import { PlanteModeleService } from 'src/app/services/plante-modele-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userview-keysearch-plant',
  templateUrl: './userview-keysearch-plant.component.html',
  styleUrls: ['./userview-keysearch-plant.component.css']
})
export class UserviewKeysearchPlantComponent implements OnInit {

  allPlant = new Array<PlanteModeleUpdateDto>();
  pageActive:number =0;
  maxPage:number=0;
  pageTotal:number[]=[];
  keyWord: string;
  message:string = '';

  constructor(private service:PlanteModeleService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.keyWord = this.route.snapshot.paramMap.get('key');
    this.getKey(this.pageActive);
  }

  range(pactif,ptotal) {
    if(ptotal>5){
      if(pactif<3) return (new Array(5)).fill(undefined).map((_, i) => i);
      else if(pactif>2 && pactif<ptotal-2) return (new Array(5)).fill(undefined).map((_, i) => i+pactif-2);
      else return (new Array(5)).fill(undefined).map((_, i) => i+ptotal-5);
    }else{
      return (new Array(ptotal)).fill(undefined).map((_, i) => i);
    }
  }

  getKey(page: number) {
    this.service.getKeyWord(this.keyWord,page).subscribe(
      responseDto => {
       
        if (!responseDto.error) {
            this.allPlant = responseDto.body.content;
            this.pageActive = responseDto.body.number;
            this.maxPage = responseDto.body.totalPages;
            if(this.maxPage>0){
              this.pageTotal = this.range(this.pageActive,this.maxPage);
            }else{
              this.message = 'Aucunes plantes trouvées pour ce mot clé...';
              }
        }
      }
    );
  }


}

