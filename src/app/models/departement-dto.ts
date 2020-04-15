import { MeteoUpdateDto } from './meteo-update-dto';

export class DepartementDto {
    depNum: number;
    name: string;
    weatherDep: Array<MeteoUpdateDto>;
}
