import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import {Button, CardActionArea, CardActions, CardMedia, Grid, ListItem} from '@mui/material';
import getHoursAgo from "../../helpers/timeAgoCalculator";
import formatScore from "../../helpers/formatScore";
import {CommentsComponent as DetailedPostView} from "../DetailedPostView/DetailedPostView";
import {useDispatch, useSelector} from "react-redux";
import {togglePostActive} from "../../features/redditSlice";


export function MultiActionAreaCard({post, sub}) {
    const {id, title, author, created_utc, num_comments, score} = post

    const dispatch = useDispatch();
    const activePosts = useSelector(state => state.reddit.activePosts);
    const isActive = !!activePosts[id]; // Check if this specific post is active
    
    const hoursAgo = getHoursAgo(created_utc);
    const formattedScore = formatScore(score);
    const imageUrl = post.preview?.images[0]?.source.url

    const handleIconClick = () => {
        dispatch(togglePostActive(id)); // Dispatch action with post ID
    };

    return (
        <ListItem>
            <Card sx={{width: '100%', padding: 2}}>
                <Grid container columnSpacing={1}>
                    <Grid item xs="auto" sx={{}}>
                        <Typography component="div">
                            {formattedScore}
                        </Typography>
                    </Grid>
                    <Grid item xs sx={{}}>
                        <Typography variant="h5" component="div">
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
                                <Typography variant="body1" component="div"
                                            sx={{color: 'text.primary', fontWeight: 'bold'}}>
                                    {author}
                                </Typography>
                                <Typography variant="body1" component="div">
                                    Posted {hoursAgo} hours ago
                                </Typography>
                                <Typography variant="body1" component="div" sx={{display: 'flex'}}
                                            onClick={handleIconClick}>
                                    <CommentIcon color={isActive ? 'primary' : 'action'} fontSize="large"/>
                                    {num_comments}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                        {isActive && <DetailedPostView subreddit={sub} postId={id}/>}
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>

            </Card>
        </ListItem>
    );
}
