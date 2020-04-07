import { DepartementDto } from './departement-dto';

export class MeteoCreateDto {
    temp: number;
    rain: number;
    radiation: number;
    etp: number;
    humidity: number;
    departement: DepartementDto;
    dateMeteo: Date;
}
