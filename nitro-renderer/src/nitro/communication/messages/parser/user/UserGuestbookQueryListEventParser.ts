import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export interface UserGuestbookPost {
    id: number;
    userId: number;
    userName: string;
    userFigure: string;
    message: string;
    upvotes: number;
    downvotes: number;
    createdAt: number;
    updatedAt: number;
}

export class UserGuestbookQueryListEventParser implements IMessageParser {
    private _posts: UserGuestbookPost[];

    flush(): boolean {
        this._posts = [];
        return true;
    }
    parse(wrapper: IMessageDataWrapper): boolean {
        const postCount = wrapper.readInt();

        for (let i = 0; i < postCount; i++) {
            const [id, userId, userName, userFigure, message, upvotes, downvotes, createdAt, updatedAt] = wrapper.readString().split(';');
            this.posts.push({
                id: Number(id),
                userId: Number(userId),
                userName,
                userFigure,
                message,
                upvotes: Number(upvotes),
                downvotes: Number(downvotes),
                createdAt: Number(createdAt),
                updatedAt: Number(updatedAt),
            })
        }

        return true;
    }

    public get posts(): UserGuestbookPost[] {
        return this._posts;
    }
}
