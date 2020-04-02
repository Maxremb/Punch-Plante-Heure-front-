import { SolEnum } from "src/app/enums/sol-enum.enum";
import { DepartementUpdateDto } from "./departement-update-dto";
import { UtilisateurUpdateDto } from './utilisateur-update-dto';
import { EspaceCultivableUpdateDto } from './espace-cultivable-update-dto';

export class JardinCreateDto {
    ground: SolEnum;
    length: number;
    width: number;
    name: string;
    dept: DepartementUpdateDto;
    user: UtilisateurUpdateDto;

    // Attributs provisoirs pour la génération automatique
    espaceCultivable: Array<EspaceCultivableUpdateDto>;
}
