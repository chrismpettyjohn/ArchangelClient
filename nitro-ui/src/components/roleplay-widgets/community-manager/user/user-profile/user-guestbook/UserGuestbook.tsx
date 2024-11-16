import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Button, LayoutAvatarImageView, Text } from "../../../../../../common";
import { UserGuestbookCreateComposer, UserGuestbookDeleteComposer, UserGuestbookPost, UserGuestbookQueryListComposer, UserGuestbookQueryListEvent, UserGuestbookQueryOneComposer } from "@nitro-rp/renderer";
import { useMessageEvent, useSessionInfo } from "../../../../../../hooks";
import { SendMessageComposer } from "../../../../../../api";
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";

export interface UserGuestbookProps {
    userId: number;
}

export function UserGuestbook({ userId }: UserGuestbookProps) {
    const session = useSessionInfo();
    const [message, setMessage] = useState('');
    const [creatorMode, setCreatorMode] = useState(false);
    const [posts, setPosts] = useState<UserGuestbookPost[]>([]);

    const onEditMessage = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.currentTarget.value ?? '');
    }, [setMessage]);

    const onSaveMessage = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (!message) return;
        SendMessageComposer(new UserGuestbookCreateComposer(userId, message))
    }, [message, setMessage]);

    const onDeletePost = useCallback((postId: number) => {
        SendMessageComposer(new UserGuestbookDeleteComposer(postId))
    }, [setMessage]);


    useEffect(() => {
        SendMessageComposer(new UserGuestbookQueryListComposer(userId))
    }, [userId]);

    useMessageEvent(UserGuestbookQueryListEvent, (event: UserGuestbookQueryListEvent) => {
        if (creatorMode) {
            setMessage('');
            setCreatorMode(false);
        }
        setPosts(event.getParser().posts);
    });

    if (creatorMode) {
        return (
            <form onSubmit={onSaveMessage}>
                <Text bold fontSize={5} variant="white">Leave a message</Text>
                <textarea className="form-control" value={message} onChange={onEditMessage} rows={5} />
                <br />
                <Button disabled={!message} onClick={onSaveMessage}>
                    <FaPlusSquare style={{ marginRight: 8 }} />
                    Post Message
                </Button>
            </form>
        )
    }

    return (
        <>
            <div className="guestbook" style={{ overflowY: 'auto', height: 480 }}>
                {posts.map((post, index) => (
                    <div key={index} className="guestbook-post">
                        <div className="guestbook-post-header">
                            <LayoutAvatarImageView figure={post.userFigure} direction={2} className="guestbook-post-pic" />
                            <div className="guestbook-post-info">
                                <span className="guestbook-post-username">{post.userName}</span>
                            </div>
                        </div>
                        <div className="guestbook-post-message">
                            <Text variant="white">{post.message}</Text>
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="guestbook-post-createdAt">{new Date(post.createdAt * 1000).toLocaleDateString()}</div>
                            <div className="guestbook-post-votes">
                                {
                                    post.userId === session?.userInfo?.userId && (
                                        <span className="downvotes" style={{ alignItems: 'center', display: 'flex' }}>
                                            <FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => onDeletePost(post.id)} />
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ))}
                {
                    !posts.length && <Text fontSize={6} variant="white">There are no posts yet</Text>
                }
            </div>
            <div style={{ display: 'flex', flex: 1, marginTop: 'auto', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button onClick={() => setCreatorMode(true)}>
                    <FaPlusSquare style={{ marginRight: 8 }} />
                    Add
                </Button>
            </div>
        </>

    )
}