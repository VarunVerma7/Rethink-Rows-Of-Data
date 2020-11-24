import logo from "./logo.svg";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState();
  const [skip, setSkip] = useState(0);
  useEffect(() => {
    const get = async () => {};
  }, [term]);

  const handleSubmit = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setTerm(e.target.value);

    const body = JSON.stringify({ term: e.target.value });
    const res = await axios.post("/api", body, config);
    setResults(res.data);
    // console.log(res.data);
    // console.log(results);
  };

  const loadMoreResults = async (e) => {
    setSkip(skip + 1);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ term, skip });
    console.log("THE BODY IS", body);
    const res = await axios.post("/api", body, config);
    console.log("TERM is", term);
    console.log("RES IS", res.data);
    let y = res.data.filter((x) => !results.includes(x));
    setResults([...results, ...y]);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div className="App">
        <TextField
          id="standard-textarea"
          label="Please Enter Search Term"
          placeholder="Placeholder"
          multiline
          onChange={(e) => handleSubmit(e)}
        />
        <br />

        <br />

        {results
          ? results.map((data) => (
              <List>
                <ListItem>
                  <ListItemText primary={data}></ListItemText>
                </ListItem>
              </List>
            ))
          : null}
        {results ? (
          <Button onClick={loadMoreResults} color="secondary">
            {console.log("RESULTS", results === [])}Load More Results
          </Button>
        ) : null}
      </div>
    </form>
  );
}

export default App;
