import {configureStore} from '@reduxjs/toolkit';
import redditReducer from './features/redditSlice';

export default configureStore({
    reducer: {
        reddit: redditReducer,
    },
});
