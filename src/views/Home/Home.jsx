import {BasicList as PostList} from "../../components/PostList/PostList";
import {Container, Grid} from "@mui/material";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
import Box from "@mui/material/Box";


function Home() {
    return (
        <Container maxWidth='100%' sx={{paddingTop: 2}}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <PostList/>
                </Grid>
                <Grid item xs={3}>
                    <Box sx={{position: 'fixed', width: '24%', top: '14%', zIndex: 1000}}>
                        <FilterOptions/>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home