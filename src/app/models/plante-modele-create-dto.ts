import { PeriodeUpdateDto } from "./periode-update-dto";
import { StrateEnum } from '../enums/strate-enum.enum';
import { VivaciteEnum } from '../enums/vivacite-enum.enum';

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
    assoplus: string[]; //association positive en tant que string et non plantmodel
    assomoins: string[]; //idem pour associations negatives

    periodes: Array<PeriodeUpdateDto>;

    // Attributs provisoirs pour la génération automatique
    // Il faudra mettre ceux de la plante à son developpement maximal
    surfaceAuSol: number;   //le rayon en cm
    hight: number; //en cm
    pousseSousTerre: boolean;
    grimpant: boolean;
    profondeurRacine: number; //en cm
    strate: StrateEnum;
    vivacite: VivaciteEnum;

    famille: string;
    // Mettre les degrées d'affinité avec les plantes peut-être ?
}
