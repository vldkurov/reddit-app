import getHoursAgo from "../../helpers/timeAgoCalculator";
import React from "react";
import {Divider, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Comment({comment}) {
    const {author, created_utc} = comment
    const hoursAgo = getHoursAgo(created_utc);

    return (
        <>
            <ListItem sx={{display: 'block'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                    <Typography variant="body2" component="div" sx={{fontWeight: 'bold'}}>
                        {author}
                    </Typography>
                    <Typography variant="body1" component="div" sx={{fontStyle: 'italic'}}>
                        {hoursAgo} hours ago
                    </Typography>
                </Box>
                <Typography variant="body1" component="div">
                    {comment.body}
                </Typography>
            </ListItem>
            <Divider/>
        </>
    );
}

export default Comment