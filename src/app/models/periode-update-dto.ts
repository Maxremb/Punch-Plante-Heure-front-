import { PeriodeEnum } from "../enums/periode-enum.enum";
import { DepartementUpdateDto } from './departement-update-dto';
import { PeriodeCreateDto } from './periode-create-dto';

export class PeriodeUpdateDto extends PeriodeCreateDto {
    id: number;
}
