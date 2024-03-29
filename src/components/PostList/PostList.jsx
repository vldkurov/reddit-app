import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts} from '../../features/redditSlice';
import {MultiActionAreaCard as PostItem} from "../PostItem/PostItem";

export function BasicList() {
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(state => state.reddit.selectedSubreddit);
    const posts = useSelector(state => state.reddit.posts);
    const status = useSelector(state => state.reddit.status);
    const error = useSelector(state => state.reddit.error);


    // In PostList.jsx
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts({subreddit: selectedSubreddit, searchTerm: ''}));
        }
    }, [selectedSubreddit, status, dispatch]);

    const sortedPosts = posts ? posts.slice().sort((a, b) => b.created_utc - a.created_utc) : [];


    // Render posts or loading/error state based on status
    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <Box sx={{
            width: '100%',
            bgcolor: 'background.paper'
        }}>
            <List sx={{py: 0}}>
                {sortedPosts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))}
            </List>
        </Box>
    );
}
