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

/**
 * Selection Box Component which allow users to select different groups and sets for practice
 * @param {func} props.selectSet           .
 * @param {func} props.setDisplayGroup     .
 */
export default function Groupbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(new Array(5).fill(0));
  const [page, setPage] = React.useState(0);
  const { selectSet, setDisplayGroup } = props;

  /**
   * Handle character group selection
   * @param {number} e  index of the selected group which corresponds to the array of chinese characters
   */
  const handleClick = (e) => {
    if (1 in open) setDisplayGroup([]);
    const temp = new Array(open.length)
      .fill()
      .map((_, index) => (index === e ? (open[e] ? 0 : 1) : 0));
    setOpen(temp);
  };

  /**
   * Handle page switching when button is clicked
   * @param {number} arrow  0 or 1 which determines whether the left or right arrow button is clicked
   */
  const handleButton = (arrow) => {
    arrow
      ? setPage(page + 1 <= 5 ? page + 1 : 5) //switch to next page
      : setPage(page - 1 >= 0 ? page - 1 : 0); //switch to previous page
    setOpen(new Array(5).fill(0)); //Closes expanded/selected group when switching page
    setDisplayGroup([]); //clear ongoing practice session when switching page
  };

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
          {/* Page switching and display */}
          <div className={classes.title}>
            <IconButton
              onClick={() => handleButton(0)}
              className="no-frame"
              color="inherit"
            >
              {" "}
              <ArrowBackIosIcon />{" "}
            </IconButton>
            {"PAGE " + (page + 1).toString()}
            <IconButton
              onClick={() => handleButton(1)}
              className="no-frame"
              color="inherit"
            >
              {" "}
              <ArrowForwardIosIcon />{" "}
            </IconButton>
          </div>
        </ListSubheader>
      }
      className={classes.root}
    >
      {/* List of groups ( length 5 ) displayed in the group selection bar */}
      {open.map((_, index) => (
        <GroupbarElement
          open={open[index]}
          index={index}
          page={page}
          handleClick={handleClick}
          selectSet={selectSet}
        />
      ))}
    </List>
  );
}
