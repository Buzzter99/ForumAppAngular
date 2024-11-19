import { IUser } from "./Contracts/IUser";
export class User implements IUser {
    _id: number;
    username: string;
    password: string;
    email: string;
    constructor(id: number, username: string, password: string, email: string) {
        this._id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}