import { AdminUpdateDto } from './admin-update-dto';
import { AdminCreateDto } from './admin-create-dto';

export class UtilisateurCreateDto{
    lastName: string;
    firstName: string;
    pseudo: string;
    mail: string;
    pwd: string;
    desc: string;
    phone: number;
    reput: string;
    news: boolean;
    active: boolean;
    picture: string;
}
