import { MeteoUpdateDto } from './meteo-update-dto';

export class DepartementCreateDto {
    numeroDep: number;
    nom: string;
    meteoDep: Array<MeteoUpdateDto>;
}
