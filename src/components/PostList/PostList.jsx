import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import {MultiActionAreaCard as PostItem} from "../PostItem/PostItem";

import mockData from '../../data/mockData.json';
import {Divider} from "@mui/material";

export function BasicList() {
    return (
        <Box sx={{
            width: '100%',
            // maxWidth: 360,
            bgcolor: 'background.paper'
        }}>
            {/*<nav aria-label="main mailbox folders">*/}
            {/*    <List>*/}
            {/*        <ListItem disablePadding>*/}
            {/*            <ListItemButton>*/}
            {/*                <ListItemIcon>*/}
            {/*                    <InboxIcon/>*/}
            {/*                </ListItemIcon>*/}
            {/*                <ListItemText primary="Inbox"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*        <ListItem disablePadding>*/}
            {/*            <ListItemButton>*/}
            {/*                <ListItemIcon>*/}
            {/*                    <DraftsIcon/>*/}
            {/*                </ListItemIcon>*/}
            {/*                <ListItemText primary="Drafts"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*    </List>*/}
            {/*</nav>*/}
            {/*<Divider/>*/}
            {/*<nav aria-label="secondary mailbox folders">*/}
            {/*    <List>*/}
            {/*        <ListItem disablePadding>*/}
            {/*            <ListItemButton>*/}
            {/*                <ListItemText primary="Trash"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*        <ListItem disablePadding>*/}
            {/*            <ListItemButton component="a" href="#simple-list">*/}
            {/*                <ListItemText primary="Spam"/>*/}
            {/*            </ListItemButton>*/}
            {/*        </ListItem>*/}
            {/*        <PostItem/>*/}
            {/*    </List>*/}
            {/*</nav>*/}
            <nav aria-label="secondary mailbox folders">
                <List>
                    {mockData.map(post => (
                        <>
                            <PostItem disablePadding key={post.id} title={post.title} author={post.author}/>
                            <Divider/>
                        </>
                    ))}
                </List>
            </nav>
        </Box>
    );
}
