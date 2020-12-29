import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Groupbar from "../components/Groupbar";
import TypeAssist from "../components/TypeAssist";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  groupBar: {
    flexDirection: "column",
    marginLeft: 0,
    marginTop: 150,
    width: 1000,
    height: 500,
    backgroundColor: "transparent",
  },
  paper: {
    height: 140,
    width: 140,
  },
  displayGroup: {
    marginLeft: 0,
    width: 400,
    height: 400,
    backgroundColor: "transparent",
  },
  sideBar: {
    width: 150,
    height: 500,
    backgroundColor: "transparent",
  },
  Practice: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -180,
    width: 550,
    height: 350,
    backgroundColor: "transparent",
  },
  displaySize: {
    fontSize: 30,
  },
}));

export default function Practice() {
  const classes = useStyles();
  const [chinese, setChinese] = React.useState({ chinese: [] });
  const [chineseGroup, setChineseGroup] = React.useState([[]]);
  const [displayGroup, setDisplayGroup] = React.useState([]);
  const [interactGroup, setInteractGroup] = React.useState([]);

  const GroupCharacters = (chinese) => {

    const result = new Array(Math.ceil(chinese[0].length / 50))
      .fill()
      .map((_) => chinese[0].splice(0, 50));

    const groupResult = result.map((_, index) =>
      new Array(Math.ceil(result[index].length / 10))
        .fill()
        .map((_) => result[index].splice(0, 10))
    );
    setChineseGroup(groupResult);
   
  };

  const selectSet = (group = 0, set = 0) => {
    const temp = [];
    for (var i = 0; i < chineseGroup[group][set].length; i++) {
      temp.push(chineseGroup[group][set][i].character + " ");
    }
    setDisplayGroup(temp);
    setInteractGroup(chineseGroup[group][set]);
  
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/chinese/")
      .then((response) => {
        setChinese([response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    if (chinese.length) {
      GroupCharacters(chinese);
    }
  }, [chinese]);
  return (
    <div>
      <Grid container className={classes.groupBar} spacing={2}>
        <Grid container className={classes.sideBar} spacing={2}>
          <Groupbar selectSet={selectSet} />
        </Grid>
        <Grid container className={classes.Practice} spacing={2}>
          <div className={classes.displaySize}>{displayGroup}</div>
          <TypeAssist practice={{ chinese: interactGroup }} />
        </Grid>
      </Grid>
    </div>
  );
}
