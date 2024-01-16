import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchComments} from '../../features/redditSlice';
import Comment from "../Comment/Comment";

export function CommentsComponent({subreddit, postId}) {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.reddit.comments);
    const commentsStatus = useSelector(state => state.reddit.commentsStatus);
    const error = useSelector(state => state.reddit.error);
    const activePosts = useSelector(state => state.reddit.activePosts);

    const isActive = !!activePosts[postId];

    useEffect(() => {
        // Fetch comments only if the post is active and comments have not been loaded
        if (isActive && commentsStatus === 'idle') {
            dispatch(fetchComments({subreddit, postId}));
        }
    }, [subreddit, postId, commentsStatus, dispatch, isActive]);

    // Sort comments by 'created_utc' in descending order (newest first)
    const sortedComments = comments.slice().sort((a, b) => b.created_utc - a.created_utc);


    if (!isActive) {
        return null; // Don't render anything if the post is not active
    }

    // Render comments or loading/error state based on commentsStatus
    if (commentsStatus === 'loading') {
        return <div>Loading comments...</div>;
    } else if (commentsStatus === 'failed') {
        return <div>Error loading comments: {error}</div>;
    }

    return (
        <>
            {sortedComments.map(comment => (
                <Comment key={comment.id} comment={comment}/>
            ))}
        </>
    );
}


