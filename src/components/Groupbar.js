import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import GroupbarElement from "./GroupbarElement";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./../index.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "transparent",
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    color: "#949494",
    fontFamily: "Quicksand", // "Noto Sans SC",
    fontSize: 16,
    boxShadow: 10,
  },
  padding: {
    padding: "0px",
  },
  button: {
    "& button:focus": {
      outline: "none",
    },
  },
}));

export default function Groupbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState([0, 0, 0, 0, 0]);
  const [page, setPage] = React.useState(0);
  const { selectSet, setDisplayGroup } = props;
  const handleClick = (e) => {
    const temp = new Array(open.length)
      .fill()
      .map((_, index) => (index === e ? (open[e] ? 0 : 1) : 0));

    setOpen(temp);
  };

  //Handles page switching 
  const handleButton = (arrow) => {
    arrow ? setPage(page + 1 <= 5 ? page + 1 : 5) : setPage(page - 1 >= 0 ? page-1 : 0);
    //Closes expanded group when switching page
    setOpen([0, 0, 0, 0, 0])
    setDisplayGroup([]);
  }
  
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          padding={0}
          className={classes.padding}
          component="div"
          id="nested-list-subheader"
        >
          <div className={classes.title}>
            <IconButton onClick={() => handleButton(0)} className="no-frame" color="inherit">
              {" "}
              <ArrowBackIosIcon />{" "}
            </IconButton>
            {'PAGE ' + (page + 1).toString()} 
            <IconButton onClick={() => handleButton(1)} className="no-frame" color="inherit">
              {" "}
              <ArrowForwardIosIcon />{" "}
            </IconButton>
          </div>
        </ListSubheader>
      }
      className={classes.root}
    >
      <GroupbarElement
        open={open[0]}
        index={0}
        page={page}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[1]}
        index={1}
        page={page}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[2]}
        index={2}
        page={page}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[3]}
        index={3}
        page={page}
        handleClick={handleClick}
        selectSet={selectSet}
      />
      <GroupbarElement
        open={open[4]}
        index={4}
        page={page}
        handleClick={handleClick}
        selectSet={selectSet}
      />
    </List>
  );
}
