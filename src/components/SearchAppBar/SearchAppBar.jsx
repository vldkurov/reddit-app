import * as React from 'react';
import {useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import RedditIcon from '@mui/icons-material/Reddit';
import {useDispatch} from "react-redux";
import {fetchPosts, setSelectedSubreddit} from "../../features/redditSlice";
import {IconButton} from "@mui/material";

const logo = 'RedditMinimal'

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Offset = styled('div')(({theme}) => theme.mixins.toolbar);

export default function SearchAppBar() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchPosts({searchTerm: input})); // No subreddit needed
        setInput('')
    };

    const handleRedditIconClick = () => {
        // Dispatch fetchPosts with the default subreddit
        dispatch(setSelectedSubreddit('Home'));
        dispatch(fetchPosts({subreddit: 'Home', searchTerm: ''}));
    };


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed" sx={{bgcolor: '#e91e63'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{mr: 0.5}}
                        onClick={handleRedditIconClick} // Add the click handler
                    >
                        <RedditIcon color="white" fontSize="large"/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        {logo}
                    </Typography>
                    <Box component="form" onSubmit={handleSearch} noValidate>
                        <Search type="submit" aria-label="search">
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </Search>
                    </Box>
                </Toolbar>
            </AppBar>
            <Offset/>
        </Box>
    );
}

