import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Comment from "../Comment/Comment";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {fetchComments} from "../../features/redditSlice";

export function CommentsComponent({subreddit, postId}) {
    const dispatch = useDispatch();
    const commentsStatus = useSelector(state => state.reddit.commentsStatus);
    const error = useSelector(state => state.reddit.error);
    const activePosts = useSelector(state => state.reddit.activePosts);
    const comments = useSelector(state => state.reddit.commentsByPostId[postId]);


    const isActive = !!activePosts[postId];

    // Sort comments by 'created_utc' in descending order (newest first)
    const sortedComments = comments ? comments.slice().sort((a, b) => b.created_utc - a.created_utc) : [];

    // useEffect(() => {
    //     if (isActive && commentsStatus === 'idle') {
    //         dispatch(fetchComments({subreddit, postId}));
    //     }
    // }, [subreddit, postId, commentsStatus, dispatch, isActive]);

    useEffect(() => {
        if (isActive && commentsStatus === 'idle') {
            dispatch(fetchComments({postId, subreddit}));
        }
    }, [postId, subreddit, commentsStatus, dispatch, isActive]);

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
            <Box sx={{
                width: '100%',
                bgcolor: 'background.paper'
            }}>
                <List>
                    {sortedComments.map(comment => (
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                </List>
            </Box>
        </>
    );
}


