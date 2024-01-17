import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk(
    'reddit/fetchPosts',
    async ({subreddit, searchTerm}, {rejectWithValue}) => {
        try {
            let url;
            const params = {raw_json: 1};

            if (searchTerm) {
                params.q = searchTerm;
                url = 'https://www.reddit.com/search.json';
            } else {
                url = `https://www.reddit.com/r/${subreddit}.json`;
            }

            const response = await axios.get(url, {params});
            return response.data.data.children
                .map(post => ({
                    ...post.data,
                    subreddit: post.data.subreddit || subreddit // Ensure subreddit is included
                }))
                .filter(post => !post.over_18);  // Exclude posts marked as 18+
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchComments = createAsyncThunk(
    'reddit/fetchComments',
    async ({postId, subreddit}, {rejectWithValue}) => {
        try {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
            return response.json().then(json => json[1]?.data?.children.map(child => child.data));
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
        commentsByPostId: {},
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        commentsStatus: 'idle', // Similar status for comments
        error: null,
        activePosts: {},
        scores: {},
        selectedSubreddit: 'Home', // Default subreddit
        userActions: {},
    },
    reducers: {
        // standard reducer logic
        togglePostActive: (state, action) => {
            const postId = action.payload;
            // Toggle the active state for the specific post
            state.activePosts[postId] = !state.activePosts[postId];
        },
        increaseScore: (state, action) => {
            const postId = action.payload;
            if (state.scores[postId] === undefined) {
                state.scores[postId] = 1;
            } else {
                state.scores[postId] += 1;
            }
            // Mark that the user has increased the score for this post
            state.userActions[action.payload] = 'increased';
        },
        decreaseScore: (state, action) => {
            const postId = action.payload;
            if (state.scores[postId] === undefined) {
                state.scores[postId] = -1;
            } else {
                state.scores[postId] -= 1;
            }
            // Mark that the user has decreased the score for this post
            state.userActions[action.payload] = 'decreased';
        },
        setSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
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
                const {postId} = action.meta.arg;
                state.commentsStatus = 'succeeded';
                state.commentsByPostId[postId] = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.commentsStatus = 'failed';
                state.error = action.payload; // or action.error.message
            });
    }
});

export default redditSlice.reducer;
export const {
    togglePostActive,
    increaseScore,
    decreaseScore,
    setSelectedSubreddit,
} = redditSlice.actions;

