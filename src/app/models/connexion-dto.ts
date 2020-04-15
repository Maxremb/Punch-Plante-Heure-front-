import { ResponseDto } from './response-dto';
import { AdminUpdateDto } from './admin-update-dto';
import { UtilisateurUpdateDto } from './utilisateur-update-dto';

export class ConnexionDto {

    user: boolean;
    bodyAdmin: AdminUpdateDto;
    bodyUtil: UtilisateurUpdateDto;
    token: string;

}