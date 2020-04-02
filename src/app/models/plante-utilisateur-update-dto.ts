import { healthStageEnum } from "../enums/etat-sante-enum.enum";
import { plantStageEnum } from "../enums/etat-plante-enum.enum";
import { JardinUpdateDto } from './jardin-update-dto';
import { PlanteModeleUpdateDto } from './plante-modele-update-dto';
import { PlanteUtilisateurCreateDto } from './plante-utilisateur-create-dto';

export class PlanteUtilisateurUpdateDto extends PlanteUtilisateurCreateDto {
    identifiant: number;
}
