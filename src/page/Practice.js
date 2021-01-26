import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Groupbar from "../components/Groupbar";
import TypeAssist from "../components/TypeAssist";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ReferenceTable from "./../components/ReferenceTable";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "fff",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
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
    width: 180,
    height: 500,
    backgroundColor: "transparent",
  },
  practice: {
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
  button: {
    fontSize: 11,
    color: "#949494",
    borderColor: "#e33a07",
    "&:hover": {
      borderColor: "#949494",
      color: "#e33a07",
    },
    "&::after": {
      borderColor: "#e33a07",
    },
  },
  instruction: {
    marginTop: -100,
    color: "#949494",
    fontFamily:"Quicksand",
  },
  progressBar: {
    marginLeft: 60,
    marginTop: 120,
    color: "red",
  },
}));

export default function Practice() {
  const classes = useStyles();
  const [chinese, setChinese] = React.useState({ chinese: [] });
  const [chineseGroup, setChineseGroup] = React.useState([]);
  const [displayGroup, setDisplayGroup] = React.useState([]);
  const [interactGroup, setInteractGroup] = React.useState([]);
  const [referenceGroup, setReferenceGroup] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  /**
   * Group Chinese characters called from database into appropriate structure for the web app
   * @param {array} chinese   array containing all Chinese characters called from database
   */
  const GroupCharacters = (chinese) => {

    //Splice array into "Group" of arrays of 50 Chinese characters
    const result = new Array(Math.ceil(chinese[0].length / 50))
      .fill()
      .map((_) => chinese[0].splice(0, 50));

    //Splice each of the "Group" into further 5 "Set" of arrays of 10 Chinese characters
    const groupResult = result.map((_, index) =>
      new Array(Math.ceil(result[index].length / 10))
        .fill()
        .map((_) => result[index].splice(0, 10))
    );
    setChineseGroup(groupResult);
  };

  /**
   * Display and load the selected "Set" of Chinese characters for user to practice
   * @param {number} group   selected "Group" 
   * @param {number} set     selected "Set"
   */
  const selectSet = (group = 0, set = 0) => {
    if (chineseGroup.length !== 0) {
      const temp = [];
      for (var i = 0; i < chineseGroup[group][set].length; i++) {
        temp.push(chineseGroup[group][set][i].character + " ");
      }
      setDisplayGroup(temp);
      setReferenceGroup(chineseGroup[group][set]);
      setInteractGroup(JSON.parse(JSON.stringify(chineseGroup[group][set])));
    }
  };

  //Calls Chinese characters from database
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
          {chineseGroup.length !== 0 ? (
            <Groupbar selectSet={selectSet} setDisplayGroup={setDisplayGroup} />
          ) : (
            <CircularProgress className={classes.progressBar} />
          )}
        </Grid>
        <Grid container className={classes.practice} spacing={2}>
          {displayGroup.length === 0 && (
            <div className={classes.instruction}>
              {" "}
              Select a group and set to start practicing{" "}
            </div>
          )}
          {displayGroup.length !== 0 && (
            <div className={classes.displaySize}>
              {displayGroup} <br />
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={handleToggle}
              >
                Show pinyin/meaning
              </Button>
              <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleClose}
              >
                <ReferenceTable chinese={referenceGroup} />
              </Backdrop>
              <br />
            </div>
          )}
          {displayGroup.length !== 0 && (
            <TypeAssist practice={{ chinese: interactGroup }} feedback={open}/>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
