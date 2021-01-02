import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { red } from "@material-ui/core/colors";
import "./../index.css";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "5",
    },
  },
  alertRoot: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  TextField: {
    color: "white",
    fontSize: "18px",
  },
  underline: {
    color: "red",
    "&::after": {
      border: "2px solid red",
    },
  },
  root2: {
    flexGrow: 1,
    fontSize: 15,
    marginTop: 40,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "white",
    backgroundColor: "transparent",
    boxShadow: "none",
    justify: "center",
    height: 194,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

export default function Test() {
  const classes = useStyles();

  const [selectedCharacter, setSelectedCharacter] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [divList, setDivList] = React.useState([]);
  const [selectList, setSelectList] = React.useState([]);
  const [chinese, setChinese] = React.useState({ chinese: [] });
  const [result, setResult] = React.useState("");
  
  //Update value of input text field
  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  //Update typed Chinese characters by adding the selected character
  const handleResult = (e) => {
    if (e < divList.length) {
      setResult(result + selectList[e]);
      setInputValue(""); //Clear TextField
    }
  };

  //Clear typed Chinese characters
  const handleClear = () => {
    setResult("");
  };

  //Handle deletion of typed Chinese characters
  const handleDelete = () => {
    setResult(result.slice(0, -1));
  };

  //Checks user input when any key is pressed 
  const handleKeyDown = (e) => {
    if (isNumber(String.fromCharCode(e.keyCode)) && divList.length > 0) {
      handleResult(e.keyCode - 48);
    }
    if (e.keyCode === 13) {
      e.preventDefault();

      setSelectedCharacter(
        selectedCharacter + 1 < chinese.chinese.length
          ? selectedCharacter + 1
          : 0
      );
      setInputValue(""); //Clear TextField
      setDivList([]); //Clear Chinese characters selection options
    }
  };

  useEffect(() => {
    if (Number(inputValue) || inputValue === "0") {
      setInputValue("");
    }

    if (inputValue) {
      const filtered = chinese.chinese.filter(
        (el) => el.pinyinWithoutTone === inputValue
      );
      const divList = [];
      const selectList = [];
      for (var i = 0; i < filtered.length; i++) {
        divList.push(
          <div className="result">
            {String(i) +
              " - " +
              (filtered[i].character + ": " + filtered[i].meaning)}
          </div>
        );

        selectList.push(filtered[i].character);
      }
      setDivList(divList);
      setSelectList(selectList);
    }
  }, [inputValue]);

  const [display, setDisplay] = React.useState(
    <Paper className={classes.paper} />
  );
  
  // Display options in a nicely formatted n columns x 6 rows 
  const organiseDisplay = () => {
    setDisplay(<Paper className={classes.paper} />);
    if (divList.length > 0) {
      var display = [];
      var temp = [...divList];
      const result = new Array(Math.ceil(temp.length / 6))
        .fill()
        .map((_) => temp.splice(0, 6));

      for (var i = 0; i < Math.ceil(divList.length / 6); i++) {
        display.push(
          <Grid key={i} item>
            <Paper className={classes.paper}>{result[i]}</Paper>
          </Grid>
        );
      }
      setDisplay(display);
    }
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/chinese/")
      .then((response) => {
        setChinese({ chinese: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    organiseDisplay();
  }, [divList]);

  return (
    <div>
      {/* Display list of Chinese characters corresponding to user's input */}
      <Grid container className={classes.root2} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {display}
          </Grid>
        </Grid>
      </Grid>

      {/* Handles user input and deletion/clearing of typed Chinese characters */}
      <form className={classes.root} noValidate autoComplete="off">
        <ThemeProvider theme={theme}>
            <TextField
              value={inputValue}
              id="standard-basic"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              label=""
              inputProps={{
                underline: classes.underline,
                className: classes.TextField,
                min: 0,
                style: { textAlign: "center" },
              }}
            />
        </ThemeProvider>
      </form>
      <IconButton className="no-frame" onClick={() => handleDelete()}>
        <BackspaceIcon />
      </IconButton>
      <IconButton className="no-frame" onClick={() => handleClear()}>
        <DeleteIcon />
      </IconButton>

      {/* Display typed Chinese characters */}
      <div className="result2">{result}</div>
    </div>
  );
}
