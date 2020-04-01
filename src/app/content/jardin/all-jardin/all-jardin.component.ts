import { Component, OnInit } from '@angular/core';
import { JardinUpdateDto } from 'src/app/models/jardin-update-dto';

@Component({
  selector: 'app-all-jardin',
  templateUrl: './all-jardin.component.html',
  styleUrls: ['./all-jardin.component.css']
})
export class AllJardinComponent implements OnInit {

  allJardins = new Array<JardinUpdateDto>();
  jardin = new JardinUpdateDto;

  constructor() { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll() {
    /* 
    this.service.getAll().subscribe(
     responseDto => {
        if (!responseDto.error) {
          this.allJardins = responseDto.object;
        }
        else { this.allJardins = [] }
      }
      
    );
    */
  }

  delete(id: number) {
     /*
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
    */
  }

  stockageJardin(jardin = JardinUpdateDto) {
    //this.service.jardin = this.jardin;

  }


}
