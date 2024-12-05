import { User } from "../User";

export interface IComment {
    _id: string;
    message: string;
    when: Date;
    who: User;
}