import { ResponseDto } from './response-dto';
import { AdminUpdateDto } from './admin-update-dto';
import { UtilisateurUpdateDto } from './utilisateur-update-dto';

export class ConnexionDto {

    isUser: boolean;
    bodyAdmin: AdminUpdateDto;
    bodyUser: UtilisateurUpdateDto;

}