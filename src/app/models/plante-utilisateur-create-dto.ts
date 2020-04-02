import { healthStageEnum } from '../enums/etat-sante-enum.enum';
import { plantStageEnum } from '../enums/etat-plante-enum.enum';
import { JardinUpdateDto } from './jardin-update-dto';
import { modelPlantUpdateDto } from './plante-modele-update-dto';

export class PlanteUtilisateurCreateDto {
    healthStage: healthStageEnum;
    plantStage: plantStageEnum;
    semiDate: Date;
    plantingDate: Date;
    garden: JardinUpdateDto;
    modelPlant: modelPlantUpdateDto;
    
}
