import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { red } from "@material-ui/core/colors";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    borderColor: "white",
  },
  underline: {
    color: "red",
    "&::after": {
      border: "2px solid red",
    },
  },
}));

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

/**
 * Component which displays a chinese character and a TextField component for users to input the answer
 * @param {array} props.practice       array containing the selected group and set of character for practice
 */
export default function TypeAssist(props) {
  const { practice, feedback } = props;
  const [selectedCharacter, setSelectedCharacter] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const classes = useStyles();

  const [answer, setAnswer] = React.useState([]);
  const [openCorrect, setOpenCorrect] = React.useState(false);
  const [openWrong, setOpenWrong] = React.useState(false);
  const [chinese, setChinese] = React.useState(practice);

  //Check user's input answer and display feedback according to result
  const handleClick = () => {
    handleClose();
    if (
      inputValue === chinese.chinese[selectedCharacter].pinyinWithoutTone.trim()
    ) {
      setOpenCorrect(true);
    } else {
      setOpenWrong(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenCorrect(false);
    setOpenWrong(false);
  };

  //Update value of input text field
  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  //Save attempt information to be displayed as feedback when user submits answer
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const previousChinese = chinese.chinese[selectedCharacter];
      setAnswer([
        previousChinese.pinyin,
        inputValue,
        previousChinese.character,
        previousChinese.meaning,
      ]);
      setSelectedCharacter(
        selectedCharacter + 1 < chinese.chinese.length
          ? selectedCharacter + 1
          : 0
      );
      handleClick();

      setInputValue("");
    }
  };

  React.useEffect(() => {
    const shuffled = shuffle(practice.chinese);
    setChinese({ chinese: shuffled });
  }, [practice]);

  return (
    <div>
      {/*Chinese character display */}
      <h1>
        {chinese.chinese[selectedCharacter]
          ? chinese.chinese[selectedCharacter].character
          : ""}
      </h1>
      {/*Textfield for user input */}
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

      {/*Answer feedback */}
      {!feedback &&
      <div className={classes.alertRoot}>
        <Snackbar
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
          open={openCorrect}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Correct: {answer[2]} - {answer[0]}
            <br />
            Meaning: {answer[3]}
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
          open={openWrong}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Your answer: {answer[1]}
            <br />
            Correct answer: {answer[2]} - {answer[0]}
            <br />
            Meaning: {answer[3]}
          </Alert>
        </Snackbar>
      </div>}
    </div>
  );
}
