import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MenuItem, Select} from '@mui/material';
import {fetchPosts, setSelectedSubreddit} from "../../features/redditSlice";

const predefinedSubreddits = ['Home', 'AskReddit', 'facepalm', 'gaming', 'NoStupidQuestions', 'worldnews', 'news', 'technology', 'youtube', 'sports', 'funny', 'pics', '...'];

export default function FilterOptions() {
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector(state => state.reddit.selectedSubreddit);

    const handleSubredditChange = (event) => {
        dispatch(setSelectedSubreddit(event.target.value));
        dispatch(fetchPosts({subreddit: event.target.value, searchTerm: ''}));
    };


    return (
        <Select
            defaultValue="Home"
            value={selectedSubreddit}
            onChange={handleSubredditChange}
            sx={{width: 1}}
        >
            {predefinedSubreddits.map(subreddit => (
                <MenuItem key={subreddit} value={subreddit}>{subreddit}</MenuItem>
            ))}
        </Select>
    );
}
