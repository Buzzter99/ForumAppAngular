import { IUser } from "./Contracts/IUser";
export class User implements IUser {
    _id: string;
    username: string;
    password: string;
    email: string;
    constructor(_id: string, username: string, email: string,password: string) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}