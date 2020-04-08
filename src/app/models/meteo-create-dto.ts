import { DepartementDto } from './departement-dto';

export class MeteoCreateDto {
    tempMin: number;
    tempMax: number;
    temp:number;
    rain: number;
    radiation: number;
    
   
    departement: DepartementDto;
    dateMeteo: string;
}
