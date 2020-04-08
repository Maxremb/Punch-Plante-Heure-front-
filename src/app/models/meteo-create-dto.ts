import { DepartementDto } from './departement-dto';

export class MeteoCreateDto {
    tempMax: number;
    tempMin: number;
    rain: number;
    radiation: number;
    etp: number;
    departement: DepartementDto;
    dateMeteo: Date;
}
