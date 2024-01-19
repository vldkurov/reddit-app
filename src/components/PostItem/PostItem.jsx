import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {CardActionArea, CardMedia, Grid, IconButton, ListItem} from '@mui/material';
import getHoursAgo from "../../helpers/timeAgoCalculator";
import formatScore from "../../helpers/formatScore";
import {CommentsComponent as DetailedPostView} from "../DetailedPostView/DetailedPostView";
import {useDispatch, useSelector} from "react-redux";
import {decreaseScore, fetchComments, increaseScore, togglePostActive} from "../../features/redditSlice";
import Box from "@mui/material/Box";


export function MultiActionAreaCard({post}) {
    const {id, title, author, created_utc, num_comments, score, subreddit} = post

    const dispatch = useDispatch();
    const activePosts = useSelector(state => state.reddit.activePosts);
    const userAction = useSelector(state => state.reddit.userActions[post.id]);
    const isActive = !!activePosts[id]; // Check if this specific post is active

    const hoursAgo = getHoursAgo(created_utc);
    const imageUrl = post.preview?.images[0]?.source.url

    const modifiedScore = useSelector(state => state.reddit.scores[id]) || 0;
    const displayScore = formatScore(score + modifiedScore);

    const handleIncreaseScore = () => {
        if (userAction !== 'increased') {
            dispatch(increaseScore(post.id));
        }
    };

    const handleDecreaseScore = () => {
        if (userAction !== 'decreased') {
            dispatch(decreaseScore(post.id));
        }
    };

    const handleIconClick = () => {
        if (!isActive) {
            dispatch(fetchComments({subreddit: subreddit, postId: id}));
        }
        dispatch(togglePostActive(id));
    };

    return (
        <ListItem sx={{p: 0, mb: 1}}>
            <Card sx={{width: '100%', padding: 1}}>
                <Grid container columnSpacing={1}>
                    <Grid item xs="auto">
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column', // Arrange items vertically
                                alignItems: 'center'
                                // display: 'flex',
                                // alignItems: 'center',
                                // justifyContent: 'center'
                            }}>
                                <IconButton
                                    onClick={handleIncreaseScore}
                                    disabled={userAction === 'increased'}
                                    sx={{
                                        cursor: userAction !== 'increased' ? 'pointer' : 'default',
                                        '&:hover': {
                                            bgcolor: userAction !== 'increased' ? 'green' : 'transparent',
                                            color: userAction !== 'increased' ? 'white' : 'grey', // White color on hover
                                        },
                                        color: userAction === 'increased' ? 'grey' : 'green',
                                        m: 1
                                    }}
                                >
                                    <ArrowUpwardIcon/>
                                </IconButton>
                                <Typography component="div">{displayScore}</Typography>
                                <IconButton
                                    onClick={handleDecreaseScore}
                                    disabled={userAction === 'decreased'}
                                    sx={{
                                        cursor: userAction !== 'decreased' ? 'pointer' : 'default',
                                        '&:hover': {
                                            bgcolor: userAction !== 'decreased' ? 'red' : 'transparent',
                                            color: userAction !== 'decreased' ? 'white' : 'grey', // White color on hover
                                        },
                                        color: userAction === 'decreased' ? 'grey' : 'red',
                                        m: 1
                                    }}
                                >
                                    <ArrowDownwardIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" component="div">
                            {title}
                        </Typography>
                        <CardActionArea>
                            {imageUrl && <CardMedia
                                component="img"
                                image={imageUrl}
                                alt={title}
                                sx={{borderRadius: 3}}
                            />}
                            <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Box sx={{
                                    display: 'block',
                                }}>
                                    <Typography variant="body1" component="div"
                                                sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                        {author}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        {hoursAgo} hours ago
                                    </Typography>
                                </Box>
                                <Typography variant="body1" component="div"
                                            onClick={handleIconClick}>
                                    <CommentIcon color={isActive ? 'primary' : 'action'} fontSize="large"/>
                                    {num_comments}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        {isActive && <DetailedPostView postId={id} subreddit={subreddit}/>}
                    </Grid>
                </Grid>
            </Card>
        </ListItem>
    );
}
