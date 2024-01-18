import React from 'react';
import {Box, IconButton, Link, Typography} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
// ... import other social media icons as needed


export default function Footer() {
    return (
        <Box sx={{bgcolor: '#e91e63', color: 'white', p: 3, textAlign: 'center'}}>
            <Typography variant="subtitle1">
                Developed by Volodymyr Kurov
            </Typography>
            <Box>
                <IconButton color="inherit" component={Link}
                            href="https://www.linkedin.com/in/volodymyr-kurov-1a5043253/"
                            target="_blank">
                    <LinkedInIcon/>
                </IconButton>
                <IconButton color="inherit" component={Link} href="https://twitter.com/volodymyrkurov" target="_blank">
                    <TwitterIcon/>
                </IconButton>
                <IconButton color="inherit" component={Link} href="https://github.com/vldkurov" target="_blank">
                    <GitHubIcon/>
                </IconButton>
                {/* Add other social media icons with links */}
            </Box>
        </Box>
    );
}
