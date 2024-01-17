import {BasicList as PostList} from "../../components/PostList/PostList";
import {Container, Grid} from "@mui/material";
import FilterOptions from "../../components/FilterOptions/FilterOptions";


function Home() {
    return (
        <Container maxWidth='100%' sx={{paddingTop: 2}}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <PostList/>
                </Grid>
                <Grid item xs={3}>
                    <FilterOptions/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Home