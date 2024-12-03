import { Comment } from "../Comment";
import { User } from "../User";
export interface IForumPost {
    _id: string;
    topic: string;
    description: string;
    additionalInfo: string;
    when: Date;
    who: User;
    comments: Comment[]
    isOwner: boolean
    isLiked: boolean
    likes: string[]
}