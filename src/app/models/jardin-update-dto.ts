import { SolEnum } from "src/app/enums/sol-enum.enum";
import { DepartementDto } from "./departement-dto";
import { UtilisateurUpdateDto } from './utilisateur-update-dto';
import { JardinCreateDto } from './jardin-create-dto';

export class JardinUpdateDto extends JardinCreateDto {
    identifier: number;
}
