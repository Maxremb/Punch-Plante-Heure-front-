import { MeteoUpdateDto } from './meteo-update-dto';

export class DepartementCreateDto {
    depNum: number;
    name: string;
    weatherDep: Array<MeteoUpdateDto>;
}
