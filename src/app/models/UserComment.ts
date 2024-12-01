import { Comment } from "./Comment";
import { IUserComment } from "./Contracts/IUserComment";

export class UserComment implements IUserComment {
    comment: Comment = new Comment();
    postId: string = '';
    
}