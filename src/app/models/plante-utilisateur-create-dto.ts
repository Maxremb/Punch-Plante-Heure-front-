import { EtatSanteEnum } from '../enums/etat-sante-enum.enum';
import { EtatPlanteEnum } from '../enums/etat-plante-enum.enum';
import { JardinUpdateDto } from './jardin-update-dto';
import { PlanteModeleUpdateDto } from './plante-modele-update-dto';

export class PlanteUtilisateurCreateDto {
    etatSante: EtatSanteEnum;
    periodesemi: Date;
    etatPlante: EtatPlanteEnum;
    jardin: JardinUpdateDto;
    planteModele: PlanteModeleUpdateDto;
    datePlantation: Date;
}
