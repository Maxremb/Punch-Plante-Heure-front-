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
    famille: string;
    assoplus: string[]; //association positive en tant que string et non plantmodel
    assomoins: string[]; //idem pour associations negatives

    periodes: Array<PeriodeUpdateDto>;

    // Attributs provisoirs pour la génération automatique
    // Il faudra mettre ceux de la plante à son developpement maximal
    surfaceAuSol: number;   //le rayon en cm
    higth: number;
    pousseSousTerre: boolean;
    grimpant: boolean;
    // Mettre les degrées d'affinité avec les plantes peut-être ?
}
