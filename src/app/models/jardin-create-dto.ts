import { SolEnum } from "src/app/enums/sol-enum.enum";
import { DepartementDto } from "./departement-dto";
import { UtilisateurUpdateDto } from './utilisateur-update-dto';
import { LargeurCheminEnum } from '../enums/largeur-chemin-enum.enum';
import { LargeurPlancheEnum } from '../enums/largeur-planche-enum.enum';

export class JardinCreateDto {
    ground: SolEnum;
    name: string;
    length: number;
    width: number;

    depthGround: number;
    usefullReserve: number;
    isArrosed: boolean;
    maxReserve: number;

    dept: DepartementDto;
    user: UtilisateurUpdateDto;

    // Attributs provisoires pour la génération automatique
    chemin: Array<number>;
}
