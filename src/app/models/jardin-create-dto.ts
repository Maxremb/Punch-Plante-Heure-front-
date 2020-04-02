import { SolEnum } from "src/app/enums/sol-enum.enum";
import { DepartementUpdateDto } from "./departement-update-dto";
import { UtilisateurUpdateDto } from './utilisateur-update-dto';

export class JardinCreateDto {
    ground: SolEnum;
    length: number;
    width: number;
    nom: string;
    dept: DepartementUpdateDto;
    user: UtilisateurUpdateDto;
}
