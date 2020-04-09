import { PeriodeEnum } from "../enums/periode-enum.enum";
import { DepartementDto } from './departement-dto';
import { PlanteModeleUpdateDto } from './plante-modele-update-dto';

export class PeriodeCreateDto {
    startDate: Date;
    endDate: Date;
    periodType: PeriodeEnum;
    county: DepartementDto;
    plantSpecies : PlanteModeleUpdateDto;
}
