import { FormEvent, useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { useSearchContext } from "../contexts/SearchContext";

const SearchWrapper = styled("div")(({ theme }) => ({
  display: 'flex',
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


export default function Search() {
  const {searchValue, setSearchValue} = useSearchContext();
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchValue(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchWrapper>
        <StyledInputBase
          id="search-input"
          placeholder="Find Pokemon…"
          inputProps={{ "aria-label": "find pokemon" }}
          name="pokemon-search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      </SearchWrapper>
    </form>
  );
};
