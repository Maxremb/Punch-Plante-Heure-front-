import { PeriodeEnum } from "../enums/periode-enum.enum";

export class PeriodeCreateDto {
    dateDebut: Date;
    dateFin: Date;
    type: PeriodeEnum;
}
