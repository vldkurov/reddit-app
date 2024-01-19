import {Container, Grid} from "@mui/material";
import {BasicList as PostList} from "../../components/PostList/PostList";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
import Box from "@mui/material/Box";


// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

function Home() {
    return (
        <Container maxWidth='100%' sx={{paddingTop: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Box sx={{
                        position: {xs: 'static', md: 'fixed'},
                        width: {xs: 1, md: '23%'},
                        // Adjust top position as needed
                        top: {md: '11.5%'}
                    }}>
                        <FilterOptions/>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <PostList/>
                </Grid>
            </Grid>
        </Container>
    );
}

// borderStyle: 'solid', borderWidth: '1px', borderColor: 'red',

export default Home