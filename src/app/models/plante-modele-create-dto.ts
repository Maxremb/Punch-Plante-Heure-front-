import { PeriodeUpdateDto } from "./periode-update-dto";

export class PlanteModeleCreateDto {
    nomCommun: string;
    nomScientifique: string;
    intervalArrossage: number;
    ensoleillementOpti: number;
    humiditeOpti: number;
    solOpti: string;
    repiquage: number;
    temperatureMin: number;
    temperatureMax: number;
    description: string;
    toxicite: boolean;
    photo: string;

    dates: Array<PeriodeUpdateDto>;  
}
