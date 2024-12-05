import { Comment } from "./Comment";
import { IForumPost } from "./Contracts/IForumPost";
import { User } from "./User";

export class ForumPost implements IForumPost {
    _id: string = '';
    topic: string = '';
    description: string = '';
    additionalInfo: string = '';
    when: Date = new Date();
    who: User = {
        _id: "",
        username: "",
        password: "",
        email: ""
    }
    comments: Comment[] = [];
    isOwner: boolean = false;
    isAuth: boolean = false;
    isLiked: boolean = false;
    likes: string[] = [];
}