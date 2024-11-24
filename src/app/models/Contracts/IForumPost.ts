import { IComment } from "./IComment";
export interface IForumPost {
    _id: string;
    Topic: string;
    Description: string;
    AdditionalInfo: string;
    When: Date;
    Who: string;
    Comments: IComment[]
}