import { EtatSanteEnum } from "../enums/etat-sante-enum.enum";
import { EtatPlanteEnum } from "../enums/etat-plante-enum.enum";
import { JardinUpdateDto } from './jardin-update-dto';
import { PlanteModeleUpdateDto } from './plante-modele-update-dto';

export class PlanteUtilisateurUpdateDto {
    id: number;
    etatSante: EtatSanteEnum;
    dateSemi: Date;
    etatPlante: EtatPlanteEnum;
    jardin: JardinUpdateDto;
    planteModele: PlanteModeleUpdateDto;
    datePlantation: Date;
}
