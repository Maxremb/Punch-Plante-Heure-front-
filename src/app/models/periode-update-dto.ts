import { PeriodeEnum } from "../enums/periode-enum.enum";
import { DepartementUpdateDto } from './departement-update-dto';

export class PeriodeUpdateDto {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    type: PeriodeEnum;
    departement: DepartementUpdateDto;
}
