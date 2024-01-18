import {BasicList as PostList} from "../../components/PostList/PostList";
import {Container, Grid} from "@mui/material";
import FilterOptions from "../../components/FilterOptions/FilterOptions";
import Box from "@mui/material/Box";


// function Home() {
//     return (
//         <Container maxWidth='100%' sx={{paddingTop: 2}}>
//             <Grid container spacing={1} sx={{flexGrow: 1}}>
//                 <Grid item sm={9} xs={12}>
//                     <PostList/>
//                 </Grid>
//                 <Grid item sm={3} xs={12}>
//                     <Box sx={{position: 'fixed', width: '24%', top: '14%', zIndex: 1000}}>
//                         <FilterOptions/>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }

function Home() {
    return (
        <Container maxWidth='100%' sx={{paddingTop: 2}}>
            <Grid container spacing={0}>
                <Grid item sm={3} xs={12}
                      sx={{
                          mb: 1,
                          // borderStyle: 'solid',
                          // borderWidth: '1px',
                          // borderColor: 'red',
                      }}>
                    <Box
                        sx={{
                            position: {xs: 'static', sm: 'fixed'},
                            width: {xs: 1, sm: '23%'},
                            top: {sm: '12%'},
                            zIndex: 1000
                        }}
                    >
                        <FilterOptions/>
                    </Box>
                </Grid>
                <Grid item sm={9} xs={12} sx={{}}>
                    <PostList/>
                </Grid>
            </Grid>
        </Container>
    );
}

// borderStyle: 'solid', borderWidth: '1px', borderColor: 'red',

export default Home