import { PeriodeEnum } from "../enums/periode-enum.enum";
import { DepartementUpdateDto } from './departement-update-dto';
import { PlanteModeleUpdateDto } from './plante-modele-update-dto';

export class PeriodeCreateDto {
    dateDebut: Date;
    dateFin: Date;
    type: PeriodeEnum;
    dept: DepartementUpdateDto;
    planteModel : PlanteModeleUpdateDto;
}
