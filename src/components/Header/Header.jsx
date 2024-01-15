// import AppBar from '@mui/material/AppBar';
import SearchAppBar from "../SearchAppBar/SearchAppBar";

function Header() {
    return (
        <header>
            {/*<AppBar position="static">*/}
            {/*    <h2>RedditMinimal</h2>*/}
            {/*</AppBar>*/}
            <SearchAppBar/>
        </header>
    );
}

export default Header