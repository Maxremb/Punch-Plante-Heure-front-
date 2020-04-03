import { SolEnum } from "src/app/enums/sol-enum.enum";
import { DepartementDto } from "./departement-dto";
import { UtilisateurUpdateDto } from './utilisateur-update-dto';
import { LargeurCheminEnum } from '../enums/largeur-chemin-enum.enum';
import { LargeurPlancheEnum } from '../enums/largeur-planche-enum.enum';

export class JardinCreateDto {
    ground: SolEnum;
    length: number;
    width: number;
    name: string;
    dept: DepartementDto;
    user: UtilisateurUpdateDto;

    // Attributs provisoirs pour la génération automatique
    chemin: Array<number>;
}
