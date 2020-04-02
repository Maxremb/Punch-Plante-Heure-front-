import { PeriodeUpdateDto } from "./periode-update-dto";
import { PlanteModeleCreateDto } from './plante-modele-create-dto';

export class PlanteModeleUpdateDto extends PlanteModeleCreateDto {
    identifiant: number;
}
