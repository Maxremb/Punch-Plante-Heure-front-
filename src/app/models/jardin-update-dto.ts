import { SolEnum } from "src/app/enums/sol-enum.enum";
import { DepartementUpdateDto } from "./departement-update-dto";
import { UtilisateurUpdateDto } from './utilisateur-update-dto';

export class JardinUpdateDto {
    id: number;
    sol: SolEnum;
    longeur: number;
    largeur: number;
    nom: string;
    departement: DepartementUpdateDto;
    utilisateur: UtilisateurUpdateDto;
}
