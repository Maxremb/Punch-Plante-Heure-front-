import { SolEnum } from "src/app/enums/sol-enum.enum";
import { DepartementUpdateDto } from "./departement-update-dto";
import { UtilisateurUpdateDto } from './utilisateur-update-dto';
import { EspaceCultivableUpdateDto } from './espace-cultivable-update-dto';
import { LargeurCheminEnum } from '../enums/largeur-chemin-enum.enum';
import { LargeurPlancheEnum } from '../enums/largeur-planche-enum.enum';

export class JardinCreateDto {
    ground: SolEnum;
    length: number;
    width: number;
    name: string;
    dept: DepartementUpdateDto;
    user: UtilisateurUpdateDto;

    // Attributs provisoirs pour la génération automatique
    espaceCultivable: Array<EspaceCultivableUpdateDto>;
    largeurChemin: LargeurCheminEnum;
    largeurPlanche: LargeurPlancheEnum;
}
