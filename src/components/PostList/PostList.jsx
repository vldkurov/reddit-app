import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts} from '../../features/redditSlice';
import {MultiActionAreaCard as PostItem} from "../PostItem/PostItem";

export function BasicList() {

    const dispatch = useDispatch();
    const posts = useSelector(state => state.reddit.posts);
    const status = useSelector(state => state.reddit.status);
    const error = useSelector(state => state.reddit.error);

    const searchParam = 'pics'

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts(searchParam));
        }
    }, [status, dispatch]);

    // Render posts or loading/error state based on status
    if (status === 'loading') {
        return <div>Loading...</div>;
    } else if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    console.log('posts', posts);

    return (
        <Box sx={{
            width: '100%',
            // maxWidth: 360,
            bgcolor: 'background.paper'
        }}>
            <List>
                {posts.map(post => (
                    <PostItem
                        key={post.id}
                        post={post}
                        sub={searchParam}
                    />
                ))}
            </List>
        </Box>
    );
}
