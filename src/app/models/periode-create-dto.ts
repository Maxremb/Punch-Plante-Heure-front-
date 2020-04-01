import { PeriodeEnum } from "../enums/periode-enum.enum";
import { DepartementUpdateDto } from './departement-update-dto';

export class PeriodeCreateDto {
    dateDebut: Date;
    dateFin: Date;
    type: PeriodeEnum;
    departement: DepartementUpdateDto;
}
