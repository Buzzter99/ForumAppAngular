import { IComment } from "./IComment";
import { IForumPost } from "./IForumPost";

export class ForumPost implements IForumPost {
    _id: string = '';
    Topic: string = '';
    Description: string = '';
    AdditionalInfo: string = '';
    When: Date = new Date();
    Who: string = '';
    Comments: IComment[] = [];
    
}