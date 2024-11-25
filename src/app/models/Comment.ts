import { IComment } from "./Contracts/IComment";
import { User } from "./User";

export class Comment implements IComment {
    _id: string = '';
    message: string = '';
    when: Date = new Date();
    who: User = new User('', '', '', '');
    
}