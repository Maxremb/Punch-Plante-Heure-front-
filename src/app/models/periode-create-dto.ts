import { PeriodeEnum } from "../enums/periode-enum.enum";
import { DepartementDto } from './departement-dto';
import { PlanteModeleUpdateDto } from './plante-modele-update-dto';

export class PeriodeCreateDto {
    dateDebut: Date;
    dateFin: Date;
    type: PeriodeEnum;
    dept: number;
    planteModel : PlanteModeleUpdateDto;
    startDate: Date;
    endDate: Date;
    periodType: PeriodeEnum;
    county: DepartementDto;
    plantSpecies : PlanteModeleUpdateDto;
}
