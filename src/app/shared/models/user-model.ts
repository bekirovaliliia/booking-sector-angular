import { Role } from './role';

export class User {
    id: number;
    lastname: string;
    firstname: string;
    phone: string;
    password: string;
    photo: File;

    constructor(id?: number,
                lastname?: string, 
                firstname?: string, 
                phone?: string,
                password?: string,
                photo?: File) {
        this.id = id;
        this.lastname = lastname;
        this.firstname = firstname;
        this.phone = phone;
        this.password = password;
        this.photo = photo;
      }
}
