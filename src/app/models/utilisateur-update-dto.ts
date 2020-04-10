import { UtilisateurCreateDto } from './utilisateur-create-dto';

export class UtilisateurUpdateDto extends UtilisateurCreateDto {
    identifier: number;
    active: boolean;
}
