import { PeriodeUpdateDto } from "./periode-update-dto";

export class PlanteModeleCreateDto {
    commun: string;
    scientifique: string;
    arrosage: number;
    ensoleillement: string;
    humidite: number;
    sol: string;
    repiquage: number;
    min: number;
    max: number;
    desc: string;
    toxi: boolean;
    picture: string;

    periodes: Array<PeriodeUpdateDto>;
}
