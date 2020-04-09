import { PeriodeUpdateDto } from "./periode-update-dto";
import { StrateEnum } from '../enums/strate-enum.enum';
import { VivaciteEnum } from '../enums/vivacite-enum.enum';
import { SolEnum } from '../enums/sol-enum.enum';

export class PlanteModeleCreateDto {
    commun: string;
    scientifique: string;
    arrosage: number;
    ensoleillement: string;
    humidite: number;
    sol: SolEnum;
    repiquage: number;
    min: number;
    max: number;
    desc: string;
    toxi: boolean;
    picture: string;
    positive: string[]; //association positive en tant que string et non plantmodel
    negative: string[]; //idem pour associations negatives
    height: number; //en cm
    feuille: string;
    veget: string;
    mifa: string;
    // Mettre les degrées d'affinité avec les plantes peut-être ?
}
