import { useContext } from "react";
import { AppContext } from "../../App";
import TextField from '@mui/material/TextField';

const Search = () => {
    const {setSearch} = useContext(AppContext);

    return (
        <TextField id="filled-basic" label="Search Users" variant="filled" margin="dense" size="small" onChange={(event) => setSearch(event.target.value)}/>
    )
};

export default Search;