import React from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import axios from "axios";
import { red } from "@material-ui/core/colors";
import TypeAssist from "./../components/TypeAssist";


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

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

export default function Test() {
  const classes = useStyles();

  const [chinese, setChinese] = React.useState({ chinese: [] });

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

  return (
    <TypeAssist practice={{ chinese: chinese }} />
  );
}
