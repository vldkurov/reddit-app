import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// ${subreddit}

// Async thunk for fetching posts from Reddit
export const fetchPosts = createAsyncThunk(
    'reddit/fetchPosts',
    async (subreddit, {rejectWithValue}) => {
        try {
            const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`, {
                params: {
                    raw_json: 1
                }
            });
            return response.data.data.children.map(post => post.data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchComments = createAsyncThunk(
    'reddit/fetchComments',
    async ({subreddit, postId}, {rejectWithValue}) => {
        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
            const json = await response.json();
            // Assuming the comments are in the second array element
            return json[1]?.data?.children.map(child => child.data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        posts: [],
        comments: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        commentsStatus: 'idle', // Similar status for comments
        error: null,
        activePosts: {},
    },
    reducers: {
        // standard reducer logic
        togglePostActive: (state, action) => {
            const postId = action.payload;
            // Toggle the active state for the specific post
            state.activePosts[postId] = !state.activePosts[postId];
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle post-related actions
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add any fetched posts to the array
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log('Rejected action:', action);
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : action.error.message;
            })
            // Handle comments fetch actions
            .addCase(fetchComments.pending, (state) => {
                state.commentsStatus = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.commentsStatus = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.commentsStatus = 'failed';
                state.error = action.payload; // or action.error.message
            });
    }
});

export default redditSlice.reducer;
export const {togglePostActive} = redditSlice.actions;

