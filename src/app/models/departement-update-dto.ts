import { MeteoUpdateDto } from './meteo-update-dto';

export class DepartementUpdateDto {
    numeroDep: number;
    nom: string;
    meteoDep: Array<MeteoUpdateDto>;
}
