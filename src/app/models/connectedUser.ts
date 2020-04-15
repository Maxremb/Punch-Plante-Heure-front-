import { Role } from '../enums/role.enum';

export class ConnectedUser {
    
    public id: number;
    public pseudo: string;
    public mail: string;
    public role: Role;

}