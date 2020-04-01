import { PeriodeEnum } from "../enums/periode-enum.enum";

export class PeriodeUpdateDto {
    id: number;
    dateDebut: Date;
    dateFin: Date;
    type: PeriodeEnum;
}
